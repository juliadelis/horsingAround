# Horsing Around

Horsing Around is a full-stack horse management platform for riding schools, stables, and equestrian organizations. It centralizes horse records, operational dashboards, organization access, and team member authorization in a private workspace.

Live project: <a href="https://horsing-around.vercel.app/" target="_blank" rel="noopener noreferrer">https://horsing-around.vercel.app/</a>

## Product Preview

### Login

![Login screen](docs/images/login.png)

### Registration

![Registration screen](docs/images/register.png)

### Organization Selection

![Organization selection screen](docs/images/organizations.png)

### Dashboard

![Organization dashboard](docs/images/dashboard.png)

### Horse List

![Horse list screen](docs/images/horses.png)

### Horse Profile

![Horse profile screen](docs/images/horse-profile.png)

### Horse Form

![Horse form screen](docs/images/horse-form.png)

### Team Management

![Team management screen](docs/images/team.png)

## Overview

The application is designed for teams that need a structured way to manage horses and organization access. Users can create organizations, register horses with detailed data and photos, monitor key operational indicators, and invite authorized members by email.

The current product supports multi-organization access, authenticated private routes, image uploads, and team authorization flows backed by Supabase Auth.

## Core Features

- Authentication with Supabase email and password accounts.
- Private application routes protected by the current Supabase session.
- Organization creation and organization switching through both the organization page and the sidebar selector.
- Horse registration with name, owner, age, breed, gender, weight, food amount, hay usage, lessons, parent names, medication status, treatment details, and photo upload.
- Horse listing with skeleton loading states and empty states.
- Horse detail view with edit and delete actions.
- Dashboard with organization context, male and female counts, medicated horses, most-used riding school horse, and skeleton loading states that preserve the final layout size.
- Team management by authorized email, without manually creating passwords for members.
- Role-based permissions per organization for admins, caretakers, trainers, and veterinarians.
- Email invitation flow for members:
  - Existing users receive a login-oriented invite.
  - New users receive a registration-oriented invite.
  - Pending authorized emails are linked to the user account after login or registration.
- Duplicate member protection by email per organization.
- Toast feedback for success and error states.
- Consistent loading, submit, and delete states for horse, organization, and team workflows.
- Standardized PrimeReact dialogs for organization creation and team member management.
- Shared visual language for highlight color, dark backgrounds, submenu surfaces, cards, text on dark backgrounds, and action buttons.
- SPA fallback configuration for direct route access on Vercel.

## Role-Based Permissions

Permissions are scoped per organization and enforced on the backend. The frontend also reflects the current role by hiding unavailable actions and disabling restricted fields.

| Role | Horse access | Team access |
| --- | --- | --- |
| Admin | Full access: view, create, edit, and delete horses | Full access: view, invite, edit, and remove members |
| Caretaker | View, create, and edit horses | View team members only |
| Trainer | View, create, and edit horses | View team members only |
| Veterinarian | View horses and edit only clinical/technical fields | View team members only |

Veterinarian horse editing is limited to:

- Medication status
- Treatment details
- Food amount
- Age
- Hay usage
- Weight
- Gender
- Father name
- Mother name
- Breed

This prevents sensitive organization and team operations from being available to non-admin roles while still allowing each role to update the operational data they are responsible for.

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Styled Components
- Axios
- Supabase JS Client
- React Toastify
- PrimeReact Dialog
- React Icons

### Backend

- Node.js
- Express
- PostgreSQL via `postgres`
- Supabase Auth
- Supabase Admin API through `SUPABASE_SERVICE_ROLE_KEY`
- Cloudinary
- Multer and Multer Cloudinary Storage
- CORS and dotenv

### Infrastructure

- Vercel for frontend deployment
- Supabase for authentication and database
- Cloudinary for horse photo storage

## UI Standards

The frontend uses a small set of shared CSS variables to keep the application visually consistent:

```css
--color-accent: #FFD08A;
--color-bg-dark: #22211C;
--color-bg-submenu: #333129;
--color-card: #AFAFA7;
--color-text-dark-bg: #CDCCC8;
```

Action buttons follow a shared pattern across forms, dialogs, and cards: 44px minimum height, 12px by 18px padding, 16px font size, 700 font weight, pointer cursor, centered inline-flex layout, and the accent color as the main background.

The main menu includes an organization dropdown so users can switch workspaces without returning to the organization list. Loading states use reusable `LoadingState` and `Spinner` components or skeleton screens where preserving layout size improves the experience.

## Architecture

```txt
cliente/
  src/
    components/       Shared UI and domain components
    contexts/         Supabase auth session provider
    hooks/            Horse dashboard data composition
    pages/            Route-level screens
    routes/           Private and public route definitions
    services/         API and Supabase clients

backend/
  src/
    config/           Database, Supabase, and Cloudinary clients
    middlewares/      Supabase token authentication
    modules/
      auth/           Login and registration endpoints
      horses/         Horse CRUD and photo upload
      organizations/  Organization access and creation
      members/        Team authorization and invitation flow
      permissions/    Organization role authorization helpers
```

## Member Invitation Flow

The team workflow is intentionally authorization-first:

1. An organization admin adds a member by email.
2. The backend checks whether the email is already authorized for the organization.
3. If the email is new, the member is stored in `organization_members`.
4. If the Supabase user already exists, the backend links `user_id` and sends a login invite.
5. If the user does not exist yet, the backend sends a registration invite.
6. When the invited person logs in or creates an account, pending organization access is linked by email.

This avoids creating passwords on behalf of users and keeps ownership of account creation with the invited person.

## API Surface

Authenticated routes require a Supabase bearer token.

```txt
POST   /auth/register
POST   /auth/login

GET    /organizations
POST   /organizations
GET    /organizations/:id
GET    /organizations/:id/my-role

GET    /organizations/:organizationId/cavalos
GET    /organizations/:organizationId/cavalos/:id
POST   /organizations/:organizationId/cavalos
PUT    /organizations/:organizationId/cavalos/:id
DELETE /organizations/:organizationId/cavalos/:id

GET    /organizations/:organizationId/members
POST   /organizations/:organizationId/members
PATCH  /organizations/:organizationId/members/:memberId
DELETE /organizations/:organizationId/members/:memberId
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A Supabase project
- A PostgreSQL connection string
- A Cloudinary account

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```txt
http://localhost:8800
```

Required backend environment variables:

```env
DB_URL=
CLOUD_NAME=
API_KEY=
API_SECRET=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
FRONTEND_URL=http://localhost:5173
```

Important: `SUPABASE_SERVICE_ROLE_KEY` must only exist on the backend. Never expose it in the frontend.

### Frontend Setup

```bash
cd cliente
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

If the frontend environment file is used in your deployment, keep only public client values there, such as the frontend API URL and Supabase public anon key.

## Development Quality Notes

- API access is centralized through service modules on the frontend.
- Auth state is provided by a React context.
- Private routes wait for Supabase session resolution before redirecting.
- Organization role state refreshes when the active organization changes.
- Backend modules are organized by domain.
- Member invitations are idempotent by organization email.
- Loading, skeleton, and toast states are implemented across critical list, save, and delete flows.
- Dialogs and action buttons follow shared styling conventions to reduce UI drift.
