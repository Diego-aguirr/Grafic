# Grafic — Agent Instructions

## Project Context

Portfolio visual y contacto profesional para un estudio de diseño gráfico ("CraftyCraft").
Next.js 15 App Router con autenticación Supabase, base de datos Prisma/PostgreSQL, panel admin, y formulario de contacto vía EmailJS.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.4 (App Router) | Framework, SSR, routing |
| React | 19.1 | UI |
| TypeScript | 5.x (strict) | Type safety |
| Tailwind CSS | 4.x | Styling (utility-first) |
| Prisma | 7.9 | ORM, database |
| PostgreSQL | 15 | Database |
| Supabase | 2.50 (@supabase/ssr 0.6) | Auth, Storage |
| Framer Motion | 12.x | Animations |
| EmailJS | 4.x | Contact form emails |
| Geist fonts | — | Typography |

## Architecture

```
src/
├── app/
│   ├── (marketing)/          # Public pages (route group)
│   │   ├── page.tsx          # Home
│   │   ├── aboutus/
│   │   ├── contacform/
│   │   └── ourdesigns/
│   ├── (admin)/              # Protected admin (route group)
│   │   ├── layout.tsx        # Auth guard + profile check
│   │   └── dashboard/
│   ├── api/
│   │   └── images/
│   │       ├── route.ts      # GET/PATCH/DELETE images
│   │       └── upload/
│   │           └── route.ts  # POST upload image
│   ├── login/
│   ├── update-password/
│   ├── layout.tsx            # Root layout (fonts, navbar, footer)
│   ├── middleware.ts         # Auth middleware (re-exports from supabase/)
│   ├── globals.css           # Tailwind entry
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                   # Low-level UI (modals)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ContactForm.tsx
│   ├── UploadForm.tsx
│   ├── ImageList.tsx
│   ├── DesignCard.tsx
│   └── ... (feature components)
├── interfaces/               # TypeScript types
│   ├── database.ts           # Supabase DB types
│   ├── designcard.ts
│   ├── service.ts
│   └── ...
└── lib/
    ├── prisma.ts             # Prisma client singleton
    ├── supabase/
    │   ├── client.ts         # Browser client (createBrowserClient)
    │   ├── server.ts         # Server client (createServerClient + cookies)
    │   └── middleware.ts     # Auth logic (re-exported by src/middleware.ts)
    └── events/
        └── imgEvent.ts       # Custom pub/sub for image refresh
```

## Path Aliases

```ts
@components/*  → src/components/*
@lib/*         → src/lib/*
@interfaces/*  → src/interfaces/*
@/*            → src/*
```

**Always use aliases.** Never use relative paths like `../../lib/supabase/client`.

## Code Conventions

### Components
- Functional components only, no class components.
- One component per file, filename matches export name.
- Server Components by default; add `"use client"` only when state/effects/interactivity is needed.
- Use `React.FC` sparingly — prefer explicit props interfaces.
- Place shared UI primitives in `components/ui/`.

### Data Flow
- **Client components NEVER access Prisma or Supabase DB directly.**
- All CRUD operations go through API routes (`/api/images/*`).
- Client components use `fetch()` to call API routes.

### Supabase
- **Client-side**: `createClient()` from `@lib/supabase/client` (browser).
- **Server-side**: `await createClient()` from `@lib/supabase/server` (cookies-based).
- **Middleware**: `src/middleware.ts` re-exports from `@lib/supabase/middleware.ts` — refreshes auth session on `/dashboard/*`. NEVER remove `supabase.auth.getUser()`.
- **DB types**: Always import `Database` from `@interfaces/database` and type your Supabase client as `createClient<Database>()`.
- RLS (Row Level Security) is the primary access control — never bypass it from the client.

### Prisma
- **Schema**: `prisma/schema.prisma` defines models (AdminProfile, Image).
- **Client**: `@lib/prisma.ts` exports singleton `prisma` instance.
- **Always use Prisma for DB operations** — never raw SQL or Supabase DB queries.
- **API routes only** — Prisma cannot run in the browser.

### Styling
- **Tailwind CSS 4** — use utility classes directly in JSX.
- No CSS modules, no styled-components, no inline styles.
- Animations via `@midudev/tailwind-animations` plugin or Framer Motion.

### TypeScript
- **Strict mode enabled** — no `any`, no `@ts-ignore`.
- All interfaces live in `src/interfaces/`.
- Name interfaces descriptively: `DesignCardProps`, `UploadFormProps`, etc.
- Use `type` for unions/intersections, `interface` for object shapes.

### Forms & Validation
- Controlled forms with React state.
- EmailJS for contact form: use `@emailjs/browser` with env vars (`NEXT_PUBLIC_EMAILJS_*`).
- Always validate before submission; show inline errors.

### Images
- Use Next.js `<Image>` component for optimized delivery.
- External images from Supabase Storage are allowlisted in `next.config.ts` via `images.remotePatterns`.
- Upload/delete via API routes (`/api/images/*`).

### Auth Flow
- Login → `/login` → Supabase auth → redirect to `/dashboard`.
- Admin layout (`(admin)/layout.tsx`) checks `supabase.auth.getUser()` + `admin_profiles` table.
- If no user or no profile → sign out + redirect to `/login`.
- Navbar shows admin link only when `user.email === process.env.ADMIN_EMAIL`.

## Environment Variables

```env
# Supabase (Auth + Storage)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Prisma (PostgreSQL)
DATABASE_URL=postgresql://postgres:password@localhost:5432/grafic

# EmailJS
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=

# Contact
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_WHATSAPP_PHONE=

# Admin
ADMIN_EMAIL=
```

**Never commit `.env` files.** Use `.env.example` as template.

## Security Rules

1. **Never expose service_role keys** in client code — only use anon key.
2. **RLS is mandatory** on all Supabase tables — validate in DB, not just frontend.
3. **Admin check is server-side** in `(admin)/layout.tsx` — never rely solely on client-side auth.
4. **Middleware refreshes sessions** — do not bypass or skip the `getUser()` call.
5. **Sanitize user input** before storing in database.
6. **No secrets in `NEXT_PUBLIC_*` vars** — these are bundled into client JS.
7. **Prisma only on server** — client components use API routes, never Prisma directly.

## What NOT To Do

- Don't use `any` type anywhere.
- Don't create relative import paths — always use aliases.
- Don't put Server Component logic in `"use client"` files.
- Don't hardcode Supabase URLs or keys in components.
- Don't add new CSS files — Tailwind handles everything.
- Don't modify `supabase/middleware.ts` auth logic without understanding the session refresh flow.
- Don't call Prisma from client components — always use API routes.

## Docker

Development mode via `docker compose up --build`. See `Dockerfile.dev` and `docker-compose.yml`.
Production Dockerfile available in `Dockerfile` (multi-stage, standalone output).
