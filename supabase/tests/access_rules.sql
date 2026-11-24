-- Run the whole file in the Supabase SQL Editor. All test changes are rolled back.
begin;

create temporary table access_test_ids on commit drop as
select
    gen_random_uuid() as guest_a,
    gen_random_uuid() as guest_b,
    gen_random_uuid() as staff,
    gen_random_uuid() as booking_a,
    gen_random_uuid() as booking_b,
    (select max(rate_date) + 1 from public.base_rates) as extra_rate_date;

grant select on access_test_ids to anon, authenticated;

create function pg_temp.check_access(passed boolean, message text)
returns void language plpgsql as $$
begin
    if passed is distinct from true then
        raise exception 'Access test failed: %', message;
    end if;
end;
$$;

-- These identities have no passwords or emails and never survive this transaction.
insert into auth.users (id)
select guest_a from access_test_ids
union all select guest_b from access_test_ids
union all select staff from access_test_ids;

insert into public.profiles (id, first_name, last_name)
select guest_a, 'Test', 'Guest A' from access_test_ids
union all select staff, 'Test', 'Staff' from access_test_ids;

insert into public.staff_members (user_id)
select staff from access_test_ids;

insert into public.bookings (
    id, user_id, reservation_type, arrival_date, departure_date, status, total_cost
)
select booking_a, guest_a, 'conventional', current_date + 1, current_date + 2, 'confirmed', 200
from access_test_ids;

insert into public.booking_nights (booking_id, stay_date, base_rate_at_booking, nightly_price)
select booking_a, current_date + 1, 200, 200 from access_test_ids;

insert into public.room_assignments (booking_id, room_id)
select booking_a, (select id from public.rooms order by room_number limit 1)
from access_test_ids;

-- Signup's existing profile insert must still work.
set local role authenticated;
select set_config('request.jwt.claim.sub', guest_b::text, true) from access_test_ids;

insert into public.profiles (id, first_name, last_name)
select guest_b, 'Test', 'Guest B' from access_test_ids;

select pg_temp.check_access(
    (select count(*) = 1 from public.profiles),
    'A new guest can create and read their profile'
);

reset role;
insert into public.bookings (
    id, user_id, reservation_type, arrival_date, departure_date, status, total_cost
)
select booking_b, guest_b, 'conventional', current_date + 1, current_date + 2, 'confirmed', 200
from access_test_ids;

insert into public.booking_nights (booking_id, stay_date, base_rate_at_booking, nightly_price)
select booking_b, current_date + 1, 200, 200 from access_test_ids;

-- Guest A can only see and edit their own information.
set local role authenticated;
select set_config('request.jwt.claim.sub', guest_a::text, true) from access_test_ids;

select pg_temp.check_access(
    (select count(*) = 1 from public.profiles)
    and (select count(*) = 1 from public.bookings)
    and (select count(*) = 1 from public.booking_nights),
    'Guest reads are restricted to their own profile, booking and nights'
);
select pg_temp.check_access(
    not exists (select 1 from public.bookings where id = (select booking_b from access_test_ids)),
    'Another guest booking is hidden'
);
select pg_temp.check_access(
    not exists (select 1 from public.staff_members)
    and not exists (select 1 from public.rooms)
    and not exists (select 1 from public.room_assignments),
    'Staff membership and operational room data are hidden from guests'
);

update public.profiles set first_name = 'Updated' where id = (select guest_a from access_test_ids);
select pg_temp.check_access(
    (select first_name = 'Updated' from public.profiles where id = (select guest_a from access_test_ids)),
    'Guests can update their name'
);

do $$
declare
    affected integer;
begin
    update public.profiles set first_name = 'Wrong' where id = (select guest_b from access_test_ids);
    get diagnostics affected = row_count;
    perform pg_temp.check_access(affected = 0, 'Guests cannot update another profile');

    update public.base_rates set base_rate = 1 where rate_date = current_date;
    get diagnostics affected = row_count;
    perform pg_temp.check_access(affected = 0, 'Guests cannot update rates');

    begin
        insert into public.staff_members (user_id) select guest_a from access_test_ids;
        raise exception 'Guests must not be able to promote themselves';
    exception when insufficient_privilege then
        null;
    end;

    begin
        insert into public.base_rates (rate_date, base_rate)
        select extra_rate_date, 1 from access_test_ids;
        raise exception 'Guests must not be able to insert rates';
    exception when insufficient_privilege then
        null;
    end;
end;
$$;

select pg_temp.check_access(
    not has_column_privilege('authenticated', 'public.profiles', 'id', 'UPDATE')
    and not has_table_privilege('authenticated', 'public.bookings', 'INSERT')
    and not has_table_privilege('authenticated', 'public.bookings', 'UPDATE')
    and not has_table_privilege('authenticated', 'public.bookings', 'DELETE')
    and not has_table_privilege('authenticated', 'public.booking_nights', 'INSERT')
    and not has_table_privilege('authenticated', 'public.room_assignments', 'INSERT'),
    'Identity changes and unfinished booking/assignment writes remain blocked'
);

-- Staff can read hotel records and maintain rates, but cannot grant staff access.
select set_config('request.jwt.claim.sub', staff::text, true) from access_test_ids;
select pg_temp.check_access(
    (select count(*) = 3 from public.profiles where id in (
        select guest_a from access_test_ids
        union all select guest_b from access_test_ids
        union all select staff from access_test_ids
    ))
    and (select count(*) = 2 from public.bookings where id in (
        select booking_a from access_test_ids union all select booking_b from access_test_ids
    ))
    and (select count(*) = 2 from public.booking_nights where booking_id in (
        select booking_a from access_test_ids union all select booking_b from access_test_ids
    )),
    'Staff can read both guests and their booking nights'
);
select pg_temp.check_access(
    (select count(*) = 45 from public.rooms)
    and exists (select 1 from public.room_assignments where booking_id = (select booking_a from access_test_ids))
    and exists (select 1 from public.staff_members where user_id = (select staff from access_test_ids)),
    'Staff can read rooms, assignments and their membership'
);

insert into public.base_rates (rate_date, base_rate, season)
select extra_rate_date, 250, 'Temporary test' from access_test_ids;
update public.base_rates set base_rate = 275 where rate_date = (select extra_rate_date from access_test_ids);
update public.base_rates set base_rate = 275 where rate_date = current_date + 1;
select pg_temp.check_access(
    (select base_rate = 275 from public.base_rates where rate_date = (select extra_rate_date from access_test_ids))
    and (select base_rate = 275 from public.base_rates where rate_date = current_date + 1)
    and (select bool_and(nightly_price = 200) from public.booking_nights where booking_id in (
        select booking_a from access_test_ids union all select booking_b from access_test_ids
    )),
    'Staff can insert/update rates without changing booked nightly prices'
);
select pg_temp.check_access(
    not has_table_privilege('authenticated', 'public.staff_members', 'INSERT'),
    'Staff cannot grant staff membership through the website'
);

-- Visitors can read rates, but cannot read profiles or edit prices.
reset role;
set local role anon;
select set_config('request.jwt.claim.sub', '', true);
select pg_temp.check_access(
    (select count(*) >= 366 from public.base_rates)
    and not has_table_privilege('anon', 'public.profiles', 'SELECT')
    and not has_any_column_privilege('anon', 'public.base_rates', 'UPDATE'),
    'Public access is limited to reading rates'
);

reset role;
rollback;
select 'Guest, staff and visitor access checks passed; all fixtures rolled back.' as result;
