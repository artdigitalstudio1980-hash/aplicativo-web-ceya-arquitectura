# Arquitectura — CEYA Arquitectura

## 1. Principios

- **Seguridad desde el diseño:** validación en cliente y servidor, autorización en backend, mínimo privilegio.
- **Separación de frontend y backend:** Next.js para la interfaz pública y Fastify para la API; comparten contratos mediante `@ceya/shared`.
- **Reproducibilidad:** versiones fijadas, Docker multi-stage, migraciones versionadas.
- **Aislamiento de IA:** OpenClaw no es dependencia del sitio ni tiene acceso directo a base de datos o servidor.
- **Aprobación humana** para operaciones sensibles (pagos, envíos masivos, cambios de contenido crítico).
- **Trazabilidad:** auditoría de acciones administrativas y de agentes.

## 2. Stack

| Capa | Tecnología | Versión / nota |
|---|---|---|
| Runtime | Node.js | 24.14.0 (`.nvmrc`) |
| Frontend | Next.js (App Router) | 16.4.6 |
| UI | React | 19.3.1 |
| Backend API | Fastify | 5.12.8 |
| Lenguaje | TypeScript | 5.9.3 (no adoptar 7.x sin validar) |
| Estilos | Tailwind CSS | 4.3.5 |
| Lint | ESLint | 9.39.5 (temporal; ver ADR-009) |
| Validación | Zod | 4.6.7 |
| Base de datos | PostgreSQL | 16 (contenedor interno, FASE 3) |
| ORM | Prisma | 7.10.1 estable (FASE 3) |
| Contenedores | Docker + Compose | 29.1.3 / 2.40.3 en desarrollo |
| Proxy | Caddy | TLS automático en producción |
| CI/CD | GitHub Actions | Actions fijadas por SHA |
| IA | OpenClaw + modelos cloud | Red aislada, tools vía API |

FASE 2 confirmó el monorepo frontend/backend con Next.js 16, Fastify 5, TypeScript 5.9.3, Zod 4 y ESLint 9 con build, lint, typecheck, tests y auditoría en verde.

## 3. Arquitectura lógica

```text
                    INTERNET
                       |
                 HTTPS / TLS
                       |
                 CADDY (proxy)
                       |
        +--------------+--------------+
        |              |              |
   FRONTEND         BACKEND        ADMIN PANEL
   Next.js          Fastify         (por definir)
        |              |
        +------ SERVICES / DOMINIO
                       |
             +---------+---------+
             |                   |
         POSTGRESQL          FILE STORAGE
             |
        BACKUPS / LOGS
```

- Caddy expone el frontend en `/` y delega `/api/*` al backend en la red interna.
- El frontend consume la API mediante contratos validados en `@ceya/shared`.

## 4. Capas de la aplicación

- `frontend/src/app/(public)`: páginas públicas y rutas SEO.
- `frontend/src/app/(admin)`: panel protegido; toda acción se revalida en servidor.
- `backend/src/routes`: endpoints API (health, contacto, futuros módulos).
- `backend/src/config`: validación de entorno con Zod.
- `backend/src/app.ts`: registro de plugins y seguridad base.
- `packages/shared/src`: esquemas Zod y tipos compartidos.
- `backend/prisma`: esquema y migraciones versionadas (FASE 3).

## 5. Flujo de datos

1. El cliente envía una solicitud validada (Zod) por HTTPS.
2. El backend autentica, autoriza y aplica límites de solicitud.
3. La capa de servicios ejecuta la operación con consultas parametrizadas.
4. Prisma persiste en PostgreSQL dentro de la red interna.
5. Se registra auditoría si la operación es sensible.
6. La respuesta omite detalles internos y datos innecesarios.

## 6. Arquitectura de IA

- **OpenClaw** corre en una red Docker aislada, sin acceso directo a PostgreSQL ni al host.
- Los agentes consumen una **API de herramientas** del backend con permisos por rol, allowlist y auditoría.
- **Motor determinista de cotización:** los precios provienen de la base de datos; la IA solo recopila requisitos y explica.
- **RAG** sobre catálogo y contenido aprobado; sin documentos internos ni datos personales.
- **Aprobación humana** obligatoria para: enviar correos masivos, modificar precios, publicar contenido, ejecutar acciones destructivas.
- **Defensa ante prompt injection:** separación instrucciones/datos, validación de salida, herramientas acotadas, sin ejecución arbitraria.
- Proveedor principal previsto: modelo Claude de última generación; failover y triage por confirmar según costo.

## 7. Seguridad

- Cookies `HttpOnly`, `Secure` en producción y `SameSite` adecuado.
- Protección CSRF en formularios y endpoints que lo requieran.
- Rate limiting en login, contacto y API pública.
- CSP estricta basada en recursos reales; HSTS en producción.
- Secretos por variables de entorno; nunca en el repositorio.
- Contenedores con usuario no root, sin puertos internos expuestos.
- Backups cifrados y restauración probada.

## 8. Entornos

| Entorno | Estado | Uso |
|---|---|---|
| Local | Disponible | Desarrollo y pruebas |
| CI | Activo (FASE 8) | Lint, tipos, pruebas, build, auditoría, Gitleaks, CodeQL |
| Staging | Pendiente | Pruebas dinámicas y aceptación |
| Producción | Pendiente de autorización | Hostinger VPS |

## 9. Restricciones y riesgos

- Repositorio público: prohibido incluir secretos o datos sensibles.
- Plan GitHub Free: repositorio público habilita CodeQL y secret scanning; las reglas de protección se configuran al crear el repo.
- Node local 24.14.0; evitar cambios de versión sin validación.
- Prisma 7.10.1 estable; no adoptar la 8 RC.
- Puerto 5432 local ocupado por otro contenedor: usar puerto alterno para CEYA en desarrollo.
- Disco local con espacio limitado: limpiar imágenes/caché de Docker solo con autorización.

## 10. Observabilidad

- Logs estructurados sin datos sensibles.
- Healthchecks de aplicación y base de datos.
- Alertas de errores y de seguridad en producción (proveedor por definir).
- Auditoría de accesos administrativos y acciones de agentes.
