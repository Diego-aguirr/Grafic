-- =============================================================
-- Grafic — Database Schema
-- Run on first `docker compose up` via init.sql
-- =============================================================

-- ─── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Tables ──────────────────────────────────────────────────

-- Admin profiles
create table if not exists public.admin_profiles (
  id           uuid primary key default uuid_generate_v4(),
  email        text not null unique,
  is_super_admin boolean default false,
  created_at   timestamptz default now()
);

-- Images portfolio
create table if not exists public.images (
  id          uuid primary key default uuid_generate_v4(),
  url         text not null,
  description text not null default '',
  category    text not null default '',
  created_at  timestamptz default now()
);

-- ─── Seed Data ───────────────────────────────────────────────

insert into public.images (url, description, category) values
  ('/img/hero.jpeg', 'Diseño de identidad corporativa para TechStart', 'Branding'),
  ('/img/pro1.png', 'Campaña de marketing digital para EcoVida', 'Digital'),
  ('/img/pro2.png', 'Flyer promocional para Festival de Arte', 'Impresión')
on conflict do nothing;
