# JS App Monorepo

> A modern, fully-typed monorepo for web and API applications, powered by Next.js, NestJS, React, Tailwind CSS, Turborepo, and TypeScript.

---

## Table of Contents

- [JS App Monorepo](#js-app-monorepo)
  - [Table of Contents](#table-of-contents)
  - [Monorepo Architecture](#monorepo-architecture)
  - [Technology Stack](#technology-stack)
  - [Directory Structure](#directory-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Useful Commands](#useful-commands)
    - [PNPM Tips](#pnpm-tips)
  - [Web App (`apps/web`)](#web-app-appsweb)
    - [Features](#features)
    - [Environment Variables](#environment-variables)
    - [Development \& Production](#development--production)
  - [API App (`apps/api`)](#api-app-appsapi)
    - [Features](#features-1)
    - [Environment Variables](#environment-variables-1)
    - [Development \& Production](#development--production-1)
  - [Shared Packages](#shared-packages)
    - [`@js-app/env`](#js-appenv)
    - [`@js-app/auth`](#js-appauth)
    - [`@js-app/i18n`](#js-appi18n)
    - [`@js-app/shared-schemas`](#js-appshared-schemas)
    - [`@js-app/shared-utils`](#js-appshared-utils)
  - [Shared Configs](#shared-configs)
  - [Contributing](#contributing)

---

## Monorepo Architecture
This repository uses [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/) to host multiple applications (frontend and backend) alongside shared packages and configuration, ensuring consistency and efficient development across the stack.

## Technology Stack
- **Node.js** ≥ 22
- **pnpm** for fast, disk space–efficient package management
- **Turborepo** for orchestrating builds, tests, and linting
- **Next.js** with the App Router for the web front-end
- **NestJS** for the API back-end
- **React**, **TypeScript**, and **Tailwind CSS** for UI development
- **Zod** for type-safe environment variables
- **CASL** for role-based access control
- **ESLint** & **Prettier** (with Tailwind plugin) for code quality and formatting

## Directory Structure
```
js-app/
├── apps/
│   ├── api/               # NestJS backend application
│   └── web/               # Next.js frontend application
├── config/
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── packages/
│   ├── auth/              # Authentication and authorization logic (CASL roles, abilities)
│   ├── env/               # Shared environment variable definitions and loaders
│   ├── i18n/              # Internationalization setup and shared translations
│   ├── shared-schemas/    # Zod schemas shared across apps and services
│   └── shared-utils/      # General-purpose utility functions
├── .gitignore             # Files and folders ignored by Git
├── package.json           # Root-level scripts and dependency management
├── pnpm-workspace.yaml    # Monorepo workspace configuration
├── README.md              # Project overview and usage guide
└── turbo.json             # Turborepo pipeline configuration
```

## Getting Started

### Prerequisites
- **Node.js** ≥ 22
- **pnpm** ≥ 9.3.0

### Installation
```bash
# Clone the repository
git clone https://github.com/RaulSCoelho/js-app.git
cd js-app

# Install all dependencies
pnpm install
```

### Useful Commands
- **Run all apps in development mode**
  ```bash
  pnpm dev
  ```
- **Build all projects**
  ```bash
  pnpm build
  ```
- **Start apps in production mode**
  ```bash
  pnpm start
  ```
- **Lint all code**
  ```bash
  pnpm lint
  ```
- **Fix lint issues**
  ```bash
  pnpm lint:fix
  ```

### PNPM Tips
- **Prune the global store**
  ```bash
  pnpm store prune
  ```
- **Add a package to a specific workspace**
  ```bash
  pnpm add <package-name> --filter <app-or-package>
  ```
- **Run a script for a single workspace**
  ```bash
  pnpm --filter web dev
  pnpm --filter api build
  ```
- **Add a workspace dependency in one step**
  ```bash
  pnpm add <workspace-name> --workspace --filter <app>
  ```

## Web App (`apps/web`)

The `web` application is a **Next.js** frontend using the **App Router** architecture.

### Features

- **App Router (`src/app`)**
- **Custom context providers** defined in `src/app/providers.tsx`:
  - Authentication
  - Internationalization (i18n)
  - Theming (light/dark mode)
- **Tailwind CSS**
- **Environment variable validation** using `@js-app/env`
- **Role-based access control** using `@js-app/auth`, integrated with CASL
- **i18n support** via a custom provider using `@js-app/i18n`


### Environment Variables
| Variable               | Description                     | Default                        |
|------------------------|---------------------------------|--------------------------------|
| `NEXT_PUBLIC_API_URL`  | Base URL of the API             | `http://localhost:3333`       |

Create a `.env.local` in `apps/web` to override defaults:
```dotenv
NEXT_PUBLIC_API_URL=https://api.myapp.com
```

### Development & Production
```bash
# Development
pnpm --filter @js-app/web dev

# Build & Start
pnpm --filter @js-app/web build
pnpm --filter @js-app/web start
```

## API App (`apps/api`)

The `api` application is a **NestJS** project that powers the backend services.

### Features

- Built with **NestJS**, **TypeScript**, and **Zod**
- **Environment configuration** and validation via `@js-app/env`
- **JWT-based authentication** with **role-based guards** powered by `@js-app/auth`
- Supports **declarative authorization** using CASL abilities
- Shared **Zod schemas** from `@js-app/shared-schemas` for request/response validation
- Organized with a modular structure for scalability and maintainability

### Environment Variables
| Variable            | Description                                | Default                               |
|---------------------|--------------------------------------------|---------------------------------------|
| `PORT`              | Port on which the API server listens       | `3333`                                |
| `NODE_ENV`          | Environment mode                           | `development`                         |
| `CORS_ORIGINS`      | Comma-separated list of allowed origins    | `*`                                   |

Create a `.env` file in `apps/api` to override:
```dotenv
PORT=3333
```

### Development & Production
```bash
# Development
pnpm --filter @js-app/api dev

# Build & Start
pnpm --filter @js-app/api build
pnpm --filter @js-app/api start
```

## Shared Packages

### `@js-app/env`
Centralized environment variable management using **Zod**:
- Validates both server-side and client-side environment variables
- Provides default values and runtime validation
- Ensures consistent environment handling across apps

### `@js-app/auth`
Role-based access control powered by **CASL**:
- Defines user roles, permissions, and the `User` model
- Exposes `createAppAbility()` for consistent access checks in both the frontend and backend
- Enables declarative, policy-driven authorization

### `@js-app/i18n`
Internationalization support:
- Centralizes translation messages
- Provides language switch utilities
- Compatible with Next.js `app` and `pages` routers

### `@js-app/shared-schemas`
Reusable **Zod** schemas for data validation:
- Defines types shared across frontend and backend
- Useful for form validation, API DTOs, and database input/output
- Promotes type-safe contracts between services

### `@js-app/shared-utils`
General-purpose utility functions:
- Common helpers for formatting, parsing, timing, etc.
- Shared across all apps and packages
- Designed for maximum reusability

## Shared Configs

Central ESLint and TypeScript settings to keep code style consistent:
- ESLint: `config/eslint-config/next.js` & `node.js`
- TypeScript: `config/typescript-config/nextjs.json`, `node.json`, `library.json`

## Contributing
1. Fork and clone the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes, ensuring tests and linting pass
4. Push to your fork and open a pull request

Please adhere to the established code style, lint rules, and write tests for new functionality.