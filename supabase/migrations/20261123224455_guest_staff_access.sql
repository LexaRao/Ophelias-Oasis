-- Extends the six existing hotel tables; keeps the current signup policy.
create table public.staff_members (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

alter table public.staff_members enable row level security;

-- Staff membership is assigned through Supabase, never through the website.
revoke all on table
    public.profiles,
    public.bookings,
    public.booking_nights,
    public.base_rates,
    public.rooms,
    public.room_assignments,
    public.staff_members
from public, anon, authenticated;

grant select on public.base_rates to anon, authenticated;
grant select on
    public.profiles,
    public.bookings,
    public.booking_nights,
    public.rooms,
    public.room_assignments,
    public.staff_members
to authenticated;

grant insert (id, first_name, last_name) on public.profiles to authenticated;
grant update (first_name, last_name) on public.profiles to authenticated;
grant insert (rate_date, base_rate, season) on public.base_rates to authenticated;
grant update (base_rate, season) on public.base_rates to authenticated;

create policy "Users can read their own staff membership"
on public.staff_members for select to authenticated
using (user_id = (select auth.uid()));

create policy "Guests read their profile and staff read all profiles"
on public.profiles for select to authenticated
using (
    id = (select auth.uid())
    or exists (
        select 1 from public.staff_members
        where user_id = (select auth.uid())
    )
);

create policy "Users can update their own profile"
on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "Guests read their bookings and staff read all bookings"
on public.bookings for select to authenticated
using (
    user_id = (select auth.uid())
    or exists (
        select 1 from public.staff_members
        where user_id = (select auth.uid())
    )
);

create policy "Users can read nights for accessible bookings"
on public.booking_nights for select to authenticated
using (
    exists (
        select 1 from public.bookings
        where bookings.id = booking_nights.booking_id
    )
);

create policy "Everyone can read nightly rates"
on public.base_rates for select to anon, authenticated
using (true);

create policy "Staff can add nightly rates"
on public.base_rates for insert to authenticated
with check (
    exists (
        select 1 from public.staff_members
        where user_id = (select auth.uid())
    )
);

create policy "Staff can update nightly rates"
on public.base_rates for update to authenticated
using (
    exists (
        select 1 from public.staff_members
        where user_id = (select auth.uid())
    )
)
with check (
    exists (
        select 1 from public.staff_members
        where user_id = (select auth.uid())
    )
);

create policy "Staff can read rooms"
on public.rooms for select to authenticated
using (
    exists (
        select 1 from public.staff_members
        where user_id = (select auth.uid())
    )
);

create policy "Staff can read room assignments"
on public.room_assignments for select to authenticated
using (
    exists (
        select 1 from public.staff_members
        where user_id = (select auth.uid())
    )
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);

-- This schema-maintenance function is not a website action.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
