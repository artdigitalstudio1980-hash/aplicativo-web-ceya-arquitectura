# Desarrollo — CEYA Arquitectura

## 1. Requisitos

| Herramienta | Versión |
|---|---|
| Node.js | 24.14.0 (`.nvmrc`) |
| npm | 11.9.0 |
| Docker | 29.1.3 |
| Docker Compose | 2.40.3 |
| Git | 2.43.0 |
| PostgreSQL | 16 (contenedor) |

No cambies la versión de Node sin validar Next.js, Prisma, Docker y CI. El proyecto usa `nvm`.

## 2. Estado actual (FASE 2)

- Monorepo con `frontend/` (Next.js 16), `backend/` (Fastify 5) y `packages/shared/` (`@ceya/shared`).
- Backend con health check (`GET /health`), validación Zod de contacto (`POST /api/contact`), helmet, CORS y rate limit.
- `npm run dev` levanta shared, backend y frontend.
- `npm run lint`, `npm run typecheck`, `npm run test`, `npm run audit` y `npm run build` en verde.
- CI con lint, typecheck, pruebas, auditoría, build y Gitleaks; CodeQL configurado.
- Sin base de datos, Docker ni pruebas automatizadas de navegador todavía (FASE 6, 7 y 8).

## 3. Puesta en marcha (FASE 2)

```bash
git clone https://github.com/artdigitalstudio1980-hash/aplicativo-web-ceya-arquitectura.git
cd aplicativo-web-ceya-arquitectura
nvm use            # 24.14.0
npm install
npm run dev
```

Aplicación local: `http://localhost:3000`.

Backend local: `http://localhost:3001` (`GET /health`).

> El contenedor PostgreSQL de CEYA debe usar un puerto local libre (por ejemplo `5433`), porque el `5432` está ocupado por otro proyecto.

## 4. Scripts

| Comando | Función |
|---|---|
| `npm run dev` | Compila shared y levanta backend + frontend. |
| `npm run dev:frontend` | Levanta solo el frontend. |
| `npm run dev:backend` | Levanta solo el backend. |
| `npm run build` | Build de shared, backend y frontend. |
| `npm run lint` | ESLint en todos los workspaces. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run test` | Pruebas con Vitest. |
| `npm run audit` | `npm audit --audit-level=high`. |

## 5. Flujo de trabajo

- `main` es la rama estable; los cambios entran por ramas `feat/`, `fix/`, `chore/`, `docs/`.
- Commits con Conventional Commits.
- Antes de abrir PR: lint, typecheck, pruebas, build y auditoría en verde.
- No se hace merge con controles fallidos ni se desactivan reglas para "pasar".
- Revisión obligatoria de cambios que toquen auth, pagos, datos personales, Docker o CI.

## 6. Calidad

- TypeScript estricto; evitar `any` sin justificación.
- Validación Zod en el límite del sistema (formularios y backend).
- Manejo de errores sin filtrar trazas, SQL ni rutas internas al cliente.
- Pruebas para cada funcionalidad: unitarias, integración, API, auth y E2E en flujos críticos.
- Cobertura mínima acordada por módulo; no se declara terminado sin pruebas.

## 7. Variables de entorno

- Se definen en `.env` local (ignorado por Git) y en el gestor de secretos del entorno desplegado.
- `frontend/.env.example` y `backend/.env.example` son plantillas.
- `.env.example` raíz documenta las variables compartidas.
- Nunca se imprimen secretos en logs ni se envían por chat.

## 8. Problemas frecuentes

| Síntoma | Causa probable | Acción |
|---|---|---|
| `EADDRINUSE :5432` | Otro PostgreSQL local | Usar `5433` para CEYA |
| Versión de Node incorrecta | `nvm` no aplicado | `nvm use` |
| Build falla por tipos | Dependencia incompatible | Revisar versiones y lockfile |
| Docker sin espacio | Imágenes/caché acumuladas | Limpiar solo con autorización |
| Permiso denegado en Docker | Grupo `docker` no aplicado | Cerrar sesión o usar `sudo` con criterio |

## 9. Definición de terminado

- Funcionalidad implementada y validada en servidor.
- Pruebas agregadas y pasando.
- Lint, typecheck, build y auditoría sin errores bloqueantes.
- Documentación actualizada.
- Sin secretos, datos personales ni artefactos innecesarios en el repositorio.
