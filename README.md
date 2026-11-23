# CEYA Arquitectura — Plataforma Web

> Plataforma web corporativa y comercial de **CEYA Arquitectura** (Construcciones Especializadas y Arquitectura S.A.S.).

| Campo | Valor |
|---|---|
| Dominio objetivo | `ceyaarquitectura.com` |
| Estado | FASE 2 completada (monorepo frontend/backend) · FASE 3 pendiente (PostgreSQL/Prisma) |
| Repositorio | Público durante el desarrollo, sin secretos ni datos personales |
| Licencia | Propietaria — todos los derechos reservados |

## Objetivo

Centralizar la presencia digital y la operación comercial de CEYA: catálogo de productos TOSCANA, servicios de arquitectura y construcción, portafolio de proyectos, cotizaciones, contacto y panel administrativo, con una capa de IA aislada y aprobación humana para operaciones sensibles.

## Stack actual

| Componente | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4 |
| Backend | Fastify 5, TypeScript, Zod 4 |
| Lenguaje | TypeScript 5.9.3 |
| Estilos | Tailwind CSS 4 |
| Validación | Zod 4.6.7 |
| Base de datos | PostgreSQL 16 (planeada para FASE 3) |
| ORM | Prisma 7.10.1 (FASE 3) |
| Contenedores | Docker + Docker Compose (FASE 6) |
| Proxy inverso | Caddy (TLS automático) |
| CI/CD | GitHub Actions (FASE 8) |
| Agentes IA | OpenClaw (red aislada, tools vía API) |

Node.js fijado en **24.14.0** (`.nvmrc`). Las versiones exactas se fijan en los `package.json` de cada workspace y en el lockfile.

## Estructura actual (FASE 2 — monorepo)

```text
.
├── frontend/
│   ├── src/
│   ├── next.config.ts
│   ├── package.json
│   └── ...
├── backend/
│   ├── src/
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── ...
├── packages/
│   └── shared/
├── docs/
├── .github/
│   └── workflows/
├── .gitignore
├── .npmrc
├── package.json
├── tsconfig.base.json
└── ...
```

- `frontend/`: aplicación Next.js con rutas públicas, componentes y estilos.
- `backend/`: API Fastify con health check, validación de contacto y seguridad base.
- `packages/shared/`: esquemas y tipos Zod compartidos (`@ceya/shared`).

## Comandos

| Comando | Función |
|---|---|
| `npm run dev` | Compila `@ceya/shared`, levanta backend, tests compartidos y frontend. |
| `npm run dev:frontend` | Levanta solo el frontend en `http://localhost:3000`. |
| `npm run dev:backend` | Levanta solo el backend en `http://localhost:3001`. |
| `npm run dev:shared` | Compila `@ceya/shared` en watch. |
| `npm run build` | Build de `@ceya/shared`, backend y frontend. |
| `npm run lint` | ESLint en todos los workspaces. |
| `npm run typecheck` | TypeScript estricto sin emit. |
| `npm run test` | Pruebas unitarias/API con Vitest. |
| `npm run audit` | `npm audit --audit-level=high`. |

Verificación ejecutada en FASE 2:

- `npm run build`: OK.
- `npm run lint`: OK.
- `npm run typecheck`: OK.
- `npm run test`: OK (3 tests).
- `npm run audit`: OK.

## Documentación

- [Resumen del proyecto](docs/PROJECT-BRIEF.md)
- [Arquitectura](docs/ARCHITECTURE.md)
- [Identidad de marca](docs/BRAND.md)
- [Base de datos](docs/DATABASE.md)
- [Desarrollo](docs/DEVELOPMENT.md)
- [Despliegue](docs/DEPLOYMENT.md)
- [Checklist de seguridad](docs/SECURITY-CHECKLIST.md)
- [CI/CD](docs/CI-CD.md)
- [Decisiones de arquitectura](docs/DECISIONS.md)
- [Política de seguridad](SECURITY.md)

## Seguridad

Este repositorio es público mientras se desarrolla y se prueba la plataforma. **No debe contener** credenciales, tokens, claves, datos personales, precios de proveedores, direcciones privadas ni documentos internos. Los secretos se gestionan por variables de entorno y nunca se versionan. Consulta [SECURITY.md](SECURITY.md).

## Licencia

© CEYA Arquitectura. Todos los derechos reservados. Este repositorio se publica únicamente con fines de desarrollo y revisión; no se concede licencia de uso, copia ni redistribución del código o de la identidad de marca.
