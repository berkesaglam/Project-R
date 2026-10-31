-- Project R v2.0 — Sprint 3 database foundation
-- Apply in Supabase SQL Editor. Safe to re-run where practical.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.couples (
    id uuid primary key default gen_random_uuid(),
    created_by uuid not null references auth.users(id) on delete restrict,
    counter_controller_user_id uuid references auth.users(id) on delete set null,
    counter_started_at timestamptz not null default '2026-06-13T00:00:00Z',
    counter_paused_at timestamptz,
    created_at timestamptz not null default now()
);

create table if not exists public.couple_members (
    couple_id uuid not null references public.couples(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    display_name text,
    joined_at timestamptz not null default now(),
    primary key (couple_id, user_id),
    unique (user_id)
);

create table if not exists public.couple_invites (
    id uuid primary key default gen_random_uuid(),
    couple_id uuid not null references public.couples(id) on delete cascade,
    token_hash text not null unique,
    created_by uuid not null references auth.users(id) on delete cascade,
    expires_at timestamptz not null default now() + interval '7 days',
    used_by uuid references auth.users(id) on delete set null,
    used_at timestamptz,
    created_at timestamptz not null default now()
);

create table if not exists public.bucket_items (
    id uuid primary key default gen_random_uuid(),
    couple_id uuid not null references public.couples(id) on delete cascade,
    created_by uuid not null references auth.users(id),
    title text not null check (char_length(trim(title)) between 1 and 80),
    is_completed boolean not null default false,
    completed_at timestamptz,
    completed_by uuid references auth.users(id),
    created_at timestamptz not null default now()
);

create table if not exists public.notes (
    id uuid primary key default gen_random_uuid(),
    couple_id uuid not null references public.couples(id) on delete cascade,
    sender_id uuid not null references auth.users(id),
    recipient_id uuid not null references auth.users(id),
    content text not null check (char_length(trim(content)) between 1 and 1000),
    read_at timestamptz,
    created_at timestamptz not null default now(),
    constraint notes_different_users check (sender_id <> recipient_id)
);

create table if not exists public.memory_photos (
    id uuid primary key default gen_random_uuid(),
    couple_id uuid not null references public.couples(id) on delete cascade,
    uploaded_by uuid not null references auth.users(id),
    storage_path text not null unique,
    caption text,
    taken_at date,
    created_at timestamptz not null default now()
);

create index if not exists bucket_items_couple_created_idx
    on public.bucket_items(couple_id, created_at);
create index if not exists notes_couple_created_idx
    on public.notes(couple_id, created_at desc);
create index if not exists notes_recipient_unread_idx
    on public.notes(recipient_id, read_at) where read_at is null;
create index if not exists memory_photos_couple_created_idx
    on public.memory_photos(couple_id, created_at desc);

-- Security-definer membership check avoids recursive RLS policies.
create or replace function public.is_couple_member(target_couple_id uuid)
returns boolean
language sql stable security definer
set search_path = ''
as $$
    select exists (
        select 1 from public.couple_members cm
        where cm.couple_id = target_couple_id
          and cm.user_id = (select auth.uid())
    );
$$;

revoke all on function public.is_couple_member(uuid) from public;
grant execute on function public.is_couple_member(uuid) to authenticated;

-- A couple can have at most two accounts.
create or replace function public.enforce_two_couple_members()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
    if (select count(*) from public.couple_members
        where couple_id = new.couple_id) >= 2 then
        raise exception 'Bu ortak alanda en fazla iki kullanıcı olabilir.';
    end if;
    return new;
end;
$$;

drop trigger if exists couple_members_limit_two on public.couple_members;
create trigger couple_members_limit_two
before insert on public.couple_members
for each row execute function public.enforce_two_couple_members();

-- Create the shared space and make its creator the counter controller.
create or replace function public.create_couple(my_display_name text default null)
returns uuid
language plpgsql security definer
set search_path = ''
as $$
declare new_couple_id uuid;
begin
    if auth.uid() is null then raise exception 'Giriş yapmalısın.'; end if;
    if exists (select 1 from public.couple_members where user_id = auth.uid()) then
        raise exception 'Bu kullanıcı zaten bir ortak alana bağlı.';
    end if;

    insert into public.couples(created_by, counter_controller_user_id)
    values (auth.uid(), auth.uid())
    returning id into new_couple_id;

    insert into public.couple_members(couple_id, user_id, display_name)
    values (new_couple_id, auth.uid(), nullif(trim(my_display_name), ''));

    return new_couple_id;
end;
$$;

-- Create a one-time invitation. The raw token is returned only to the caller;
-- only its SHA-256 hash is stored in the database.
create or replace function public.create_couple_invite()
returns text
language plpgsql security definer
set search_path = ''
as $$
declare current_couple_id uuid;
declare invite_token text;
begin
    select couple_id into current_couple_id
    from public.couple_members where user_id = auth.uid();

    if current_couple_id is null then raise exception 'Önce ortak alan oluşturmalısın.'; end if;
    if (select count(*) from public.couple_members where couple_id = current_couple_id) >= 2 then
        raise exception 'Ortak alan zaten iki kullanıcıya sahip.';
    end if;

    invite_token := encode(extensions.gen_random_bytes(32), 'hex');
    insert into public.couple_invites(couple_id, token_hash, created_by)
    values (current_couple_id, encode(extensions.digest(invite_token, 'sha256'), 'hex'), auth.uid());

    return invite_token;
end;
$$;

create or replace function public.join_couple_with_invite(invite_token text, my_display_name text default null)
returns uuid
language plpgsql security definer
set search_path = ''
as $$
declare invite_row public.couple_invites%rowtype;
begin
    if auth.uid() is null then raise exception 'Giriş yapmalısın.'; end if;
    if exists (select 1 from public.couple_members where user_id = auth.uid()) then
        raise exception 'Bu kullanıcı zaten bir ortak alana bağlı.';
    end if;

    select * into invite_row
    from public.couple_invites
    where token_hash = encode(extensions.digest(invite_token, 'sha256'), 'hex')
      and used_at is null and expires_at > now()
    for update;

    if not found then raise exception 'Davet kodu geçersiz, süresi dolmuş veya kullanılmış.'; end if;

    insert into public.couple_members(couple_id, user_id, display_name)
    values (invite_row.couple_id, auth.uid(), nullif(trim(my_display_name), ''));

    update public.couple_invites
    set used_by = auth.uid(), used_at = now()
    where id = invite_row.id;

    return invite_row.couple_id;
end;
$$;

revoke all on function public.create_couple(text) from public;
revoke all on function public.create_couple_invite() from public;
revoke all on function public.join_couple_with_invite(text, text) from public;
grant execute on function public.create_couple(text) to authenticated;
grant execute on function public.create_couple_invite() to authenticated;
grant execute on function public.join_couple_with_invite(text, text) to authenticated;

-- Enable RLS on every user-facing table.
alter table public.couples enable row level security;
alter table public.couple_members enable row level security;
alter table public.couple_invites enable row level security;
alter table public.bucket_items enable row level security;
alter table public.notes enable row level security;
alter table public.memory_photos enable row level security;

-- Remove legacy permissive policies before installing the controlled set.
do $$
declare p record;
begin
    for p in
        select schemaname, tablename, policyname
        from pg_policies
        where schemaname = 'public'
          and tablename in ('couples','couple_members','couple_invites','bucket_items','notes','memory_photos')
    loop
        execute format('drop policy if exists %I on %I.%I', p.policyname, p.schemaname, p.tablename);
    end loop;
end $$;

create policy couples_select_member on public.couples
for select to authenticated using (public.is_couple_member(id));
create policy couples_update_counter_controller on public.couples
for update to authenticated
using (counter_controller_user_id = (select auth.uid()))
with check (counter_controller_user_id = (select auth.uid()));

create policy couple_members_select_peer on public.couple_members
for select to authenticated using (public.is_couple_member(couple_id));

create policy bucket_items_select_member on public.bucket_items
for select to authenticated using (public.is_couple_member(couple_id));
create policy bucket_items_insert_member on public.bucket_items
for insert to authenticated with check (
    public.is_couple_member(couple_id) and created_by = (select auth.uid())
);
create policy bucket_items_update_member on public.bucket_items
for update to authenticated
using (public.is_couple_member(couple_id))
with check (public.is_couple_member(couple_id));
create policy bucket_items_delete_member on public.bucket_items
for delete to authenticated using (public.is_couple_member(couple_id));

create policy notes_select_participant on public.notes
for select to authenticated using (
    public.is_couple_member(couple_id)
    and (sender_id = (select auth.uid()) or recipient_id = (select auth.uid()))
);
create policy notes_insert_sender on public.notes
for insert to authenticated with check (
    public.is_couple_member(couple_id)
    and sender_id = (select auth.uid())
    and recipient_id <> (select auth.uid())
    and exists (
        select 1 from public.couple_members peer
        where peer.couple_id = notes.couple_id
          and peer.user_id = notes.recipient_id
    )
);
create policy notes_update_recipient on public.notes
for update to authenticated
using (recipient_id = (select auth.uid()) and public.is_couple_member(couple_id))
with check (recipient_id = (select auth.uid()) and public.is_couple_member(couple_id));

create policy memory_photos_select_member on public.memory_photos
for select to authenticated using (public.is_couple_member(couple_id));
create policy memory_photos_insert_member on public.memory_photos
for insert to authenticated with check (
    public.is_couple_member(couple_id) and uploaded_by = (select auth.uid())
);
create policy memory_photos_delete_uploader on public.memory_photos
for delete to authenticated using (
    public.is_couple_member(couple_id) and uploaded_by = (select auth.uid())
);

-- Private photo bucket and couple-scoped object access.
insert into storage.buckets(id, name, public)
values ('couple-photos', 'couple-photos', false)
on conflict (id) do update set public = false;

drop policy if exists couple_photos_select_member on storage.objects;
create policy couple_photos_select_member on storage.objects
for select to authenticated using (
    bucket_id = 'couple-photos'
    and public.is_couple_member(((storage.foldername(name))[1])::uuid)
);
drop policy if exists couple_photos_insert_member on storage.objects;
create policy couple_photos_insert_member on storage.objects
for insert to authenticated with check (
    bucket_id = 'couple-photos'
    and public.is_couple_member(((storage.foldername(name))[1])::uuid)
);
drop policy if exists couple_photos_delete_member on storage.objects;
create policy couple_photos_delete_member on storage.objects
for delete to authenticated using (
    bucket_id = 'couple-photos'
    and public.is_couple_member(((storage.foldername(name))[1])::uuid)
);

-- Authenticated users need table privileges; RLS remains the access boundary.
grant select on public.couples, public.couple_members to authenticated;
grant update (counter_paused_at, counter_started_at) on public.couples to authenticated;
grant select, insert, update, delete on public.bucket_items to authenticated;
grant select, insert, update on public.notes to authenticated;
grant select, insert, delete on public.memory_photos to authenticated;
grant select on public.couple_invites to authenticated;
