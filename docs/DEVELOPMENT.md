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

## 2. Puesta en marcha (FASE 1)

```bash
git clone https://github.com/artdigitalstudio1980-hash/aplicativo-web-ceya-arquitectura.git
cd aplicativo-web-ceya-arquitectura
nvm use            # 24.14.0
npm ci
cp .env.example .env
docker compose up -d db
npx prisma migrate dev
npm run dev
```

Aplicación local: `http://localhost:3000`.

> El contenedor PostgreSQL de CEYA debe usar un puerto local libre (por ejemplo `5433`), porque el `5432` está ocupado por otro proyecto. No detengas servicios ajenos sin autorización.

## 3. Scripts previstos

| Comando | Función |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción local |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Pruebas unitarias/integración |
| `npm run test:e2e` | Pruebas end-to-end |
| `npm run audit` | `npm audit --audit-level=high` |
| `npm run db:migrate` | Migraciones en desarrollo |
| `npm run db:studio` | Prisma Studio (solo local) |

## 4. Flujo de trabajo

- `main` es la rama estable; los cambios entran por ramas `feat/`, `fix/`, `chore/`, `docs/`.
- Commits con Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `security:`).
- Antes de abrir PR: lint, typecheck, pruebas y build en verde.
- No se hace merge con controles fallidos ni se desactivan reglas para "pasar".
- Revisión obligatoria de cambios que toquen auth, pagos, datos personales, Docker o CI.

## 5. Calidad

- TypeScript estricto; evitar `any` sin justificación.
- Validación Zod en el límite del sistema (formularios y Route Handlers).
- Manejo de errores sin filtrar trazas, SQL ni rutas internas al cliente.
- Pruebas para cada funcionalidad: unitarias, integración, API, auth y E2E en flujos críticos.
- Cobertura mínima acordada por módulo; no se declara terminado sin pruebas.

## 6. Variables de entorno

- Se definen en `.env` local (ignorado por Git) y en el gestor de secretos del entorno desplegado.
- `.env.example` solo contiene nombres y valores locales no sensibles.
- Nunca se imprimen secretos en logs ni se envían por chat.

## 7. Problemas frecuentes

| Síntoma | Causa probable | Acción |
|---|---|---|
| `EADDRINUSE :5432` | Otro PostgreSQL local | Usar `5433` para CEYA |
| Versión de Node incorrecta | `nvm` no aplicado | `nvm use` |
| Build falla por tipos | Dependencia incompatible | Revisar versiones y lockfile |
| Docker sin espacio | Imágenes/caché acumuladas | Limpiar solo con autorización |
| Permiso denegado en Docker | Grupo `docker` no aplicado | Cerrar sesión o usar `sudo` con criterio |

## 8. Definición de terminado

- Funcionalidad implementada y validada en servidor.
- Pruebas agregadas y pasando.
- Lint, typecheck, build y auditoría sin errores bloqueantes.
- Documentación actualizada.
- Sin secretos, datos personales ni artefactos innecesarios en el repositorio.
