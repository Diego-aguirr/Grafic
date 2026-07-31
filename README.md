# Grafic — Portafolio de Diseño Gráfico

Plataforma profesional para mostrar trabajos de diseño gráfico, gestionar contenido y conectar con clientes.

## Stack

| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | 15.4 (App Router) | Framework, SSR, routing |
| React | 19.1 | UI |
| TypeScript | 5.x (strict) | Type safety |
| Tailwind CSS | 4.x | Estilos utility-first |
| Prisma | 7.9 | ORM, base de datos |
| PostgreSQL | 15 | Base de datos |
| Supabase | 2.50 | Auth, Storage |
| Framer Motion | 12.x | Animaciones |
| EmailJS | 4.x | Formulario de contacto |

## Inicio rápido

### Con Docker (recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/Diego-aguirr/Grafic.git
cd Grafic

# Copiar variables de entorno
cp .env.example .env

# Levantar todo (app + PostgreSQL)
docker compose up --build
```

La app estará disponible en `http://localhost:3000`.

**Servicios incluidos:**

| Servicio | Puerto | Descripción |
|---|---|---|
| Next.js | 3000 | Aplicación principal |
| PostgreSQL | 5432 | Base de datos |

### Sin Docker

```bash
# Clonar el repositorio
git clone https://github.com/Diego-aguirr/Grafic.git
cd Grafic

# Instalar dependencias
npm install

# Copiar y configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Levantar PostgreSQL (requiere PostgreSQL local)
# Crear base de datos 'grafic'
# Ejecutar init.sql para schema + seed data

npm run dev
```

## Variables de entorno

```env
# ─── Supabase (Auth + Storage) ─────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# ─── Prisma (PostgreSQL) ──────────────────────────────────
DATABASE_URL=postgresql://postgres:password@localhost:5432/grafic

# ─── EmailJS (formulario de contacto) ─────────────────────
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=

# ─── Contacto ─────────────────────────────────────────────
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_WHATSAPP_PHONE=

# ─── Admin ────────────────────────────────────────────────
ADMIN_EMAIL=
```

**Nunca commitees archivos `.env`.** Usa `.env.example` como template.

## Arquitectura

### Roles de cada herramienta

| Herramienta | Para qué la usamos |
|---|---|
| **Prisma** | Todas las operaciones CRUD de la base de datos (images, admin_profiles) |
| **Supabase Auth** | Login, sesiones, middleware de autenticación |
| **Supabase Storage** | Almacenamiento de imágenes subidas por admin |
| **API Routes** | Puente entre client components y server-side (Prisma + Supabase) |

### Flujo de datos

```
Client Component → API Route (/api/images/*) → Prisma → PostgreSQL
                                              → Supabase Storage (upload/delete)
```

Los componentes del cliente NUNCA acceden directamente a Prisma ni a Supabase DB. Todo pasa por API routes.

### Estructura del proyecto

```
src/
├── app/
│   ├── (marketing)/          # Páginas públicas
│   │   ├── page.tsx          # Home
│   │   ├── aboutus/          # Sobre nosotros
│   │   ├── contacform/       # Contacto
│   │   └── ourdesigns/       # Galería de diseños
│   ├── (admin)/              # Panel admin (protegido)
│   │   ├── layout.tsx        # Auth guard
│   │   └── dashboard/        # Gestión de imágenes
│   ├── api/
│   │   └── images/
│   │       ├── route.ts      # GET/PATCH/DELETE
│   │       └── upload/
│   │           └── route.ts  # POST (upload)
│   ├── login/                # Login
│   └── update-password/      # Recuperar contraseña
├── components/
│   ├── ui/                   # Componentes base (modals)
│   └── ...                   # Componentes de función
├── interfaces/               # Tipos TypeScript
└── lib/
    ├── prisma.ts             # Cliente Prisma (singleton)
    ├── supabase/             # Clientes Supabase (auth)
    └── events/               # Sistema de eventos custom
```

### Flujo de autenticación

```
Login → Supabase Auth → Verificar admin_profiles → Dashboard
                                                    ↓
                                              Si no existe perfil → Sign out + redirect
```

### RLS (Row Level Security)

| Tabla | Lectura | Escritura |
|---|---|---|
| `images` | Público | Solo autenticados |
| `admin_profiles` | Solo el propio usuario | Service role (signup) |

## Funcionalidades

### Público
- **Portafolio dinámico** con imágenes categorizadas (Branding, Digital, Impresión)
- **Galería responsive** con slider y grid
- **Formulario de contacto** vía EmailJS
- **Botón de WhatsApp** con animación
- **SEO optimizado** con metadata por página

### Admin
- **Autenticación segura** con Supabase Auth
- **Primer admin automático** — primer usuario registrado se convierte en admin
- **Panel de gestión** — subir, editar y eliminar imágenes
- **Almacenamiento** en Supabase Storage con categorización

## Despliegue

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

Configurar las variables de entorno en el dashboard de Vercel.

### Docker (producción)

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

## Scripts disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Build de producción (incluye prisma generate)
npm run start        # Iniciar producción
npm run lint         # Verificar código con ESLint
```

## Licencia

MIT
