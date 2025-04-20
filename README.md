# js-app Monorepo

> A modern, fully-typed monorepo for web and API applications, powered by Next.js, NestJS, React, Tailwind CSS, Turborepo, and TypeScript.

---

## Table of Contents
- [js-app Monorepo](#js-app-monorepo)
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
  - [Shared Configs](#shared-configs)
  - [Contributing](#contributing)

---

## Monorepo Architecture
This repository uses [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/) to host multiple applications (frontend and backend) alongside shared packages and configuration, ensuring consistency and efficient development across the stack.

## Technology Stack
- **Node.js** ≥ 18
- **pnpm** for fast, disk space–efficient package management
- **Turborepo** for orchestrating builds, tests, and linting
- **Next.js** with the App Router for the web front-end
- **NestJS** for the API back-end
- **React**, **TypeScript**, and **Tailwind CSS** for UI development
- **Zod** & **@t3-oss/env-nextjs** for type-safe environment variables
- **CASL** for role-based access control
- **ESLint** & **Prettier** (with Tailwind plugin) for code quality and formatting

## Directory Structure
```
js-app/
├── apps/
│   ├── web/        # Next.js front-end application
│   └── api/        # NestJS back-end application
├── packages/
│   ├── env/        # Shared environment configuration
│   └── auth/       # Shared authentication & authorization logic
├── config/
│   ├── eslint-config/       # Shared ESLint configs
│   └── typescript-config/   # Shared TypeScript configs
├── turbo.json
├── pnpm-workspace.yaml
└── package.json            # Root scripts & workspace config
```

## Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **pnpm** ≥ 8.x

### Installation
```bash
# Clone the repository
git clone <repo-url>
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

The `web` application is a Next.js project serving the front-end.

### Features
- App Router (`src/app`) with layouts and nested routes
- React Context providers in `src/app/providers.tsx` (auth, i18n, theming)
- Tailwind CSS & PostCSS configured via `tailwind.config.ts` and `postcss.config.mjs`
- Environment variables validated by `@js-app/env`
- Role-based access control via `@js-app/auth`
- i18n support with a custom language provider

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
pnpm --filter web dev

# Build & Start
pnpm --filter web build
pnpm --filter web start
```

## API App (`apps/api`)

The `api` application is a NestJS project serving the back-end.

### Features
- Built with NestJS, TypeScript, and zod
- Environment configuration via `@js-app/env`
- JWT-based authentication and role guards using `@js-app/auth`

### Environment Variables
| Variable            | Description                                | Default                               |
|---------------------|--------------------------------------------|---------------------------------------|
| `PORT`              | Port on which the API server listens       | `3333`                                |

Create a `.env` file in `apps/api` to override:
```dotenv
PORT=3333
```

### Development & Production
```bash
# Development
pnpm --filter api dev

# Build & Start
pnpm --filter api build
pnpm --filter api start
```

## Shared Packages

### `@js-app/env`
Centralizes environment variable schemas with Zod and `@t3-oss/env-nextjs`:
- Validates server, client, and shared variables
- Provides defaults and runtime checks

### `@js-app/auth`
Implements role-based access control using CASL:
- Defines `User` models, roles, and permissions
- Exposes `createAppAbility` for policy enforcement in both API and front-end

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