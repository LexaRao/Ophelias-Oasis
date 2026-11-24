-- Test prices for today through one year ahead. Existing prices are preserved.
insert into public.base_rates (rate_date, base_rate, season)
select current_date + day_offset, 200, 'Test rate'
from generate_series(0, 365) as dates(day_offset)
on conflict (rate_date) do nothing;
