# CEYA Arquitectura — Plataforma Web

> Plataforma web corporativa y comercial de **CEYA Arquitectura** (Construcciones Especializadas y Arquitectura S.A.S.).

| Campo | Valor |
|---|---|
| Dominio objetivo | `ceyaarquitectura.com` |
| Estado | FASE 0 completada (auditoría) · FASE 1 pendiente (scaffold) |
| Repositorio | Público durante el desarrollo, sin secretos ni datos personales |
| Licencia | Propietaria — todos los derechos reservados |

## Objetivo

Centralizar la presencia digital y la operación comercial de CEYA: catálogo de productos TOSCANA, servicios de arquitectura y construcción, portafolio de proyectos, cotizaciones, contacto y panel administrativo, con una capa de IA aislada y aprobación humana para operaciones sensibles.

## Stack previsto

| Componente | Tecnología |
|---|---|
| Frontend / Backend | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 |
| Base de datos | PostgreSQL 16 |
| ORM | Prisma 7.10.1 (estable; no usar la línea 8 RC) |
| Validación | Zod 4 |
| Contenedores | Docker + Docker Compose |
| Proxy inverso | Caddy (TLS automático) |
| CI/CD | GitHub Actions |
| Agentes IA | OpenClaw (red aislada, tools vía API) |

Node.js fijado en **24.14.0** (`.nvmrc`). Las versiones exactas se fijan en `package.json` y `package-lock.json` al iniciar la FASE 1 y se validan con build + auditoría antes de adoptarlas.

## Estructura objetivo

```text
.
├── src/
│   ├── app/            # rutas públicas, admin y API
│   ├── components/     # UI, layout y compartidos
│   ├── features/       # servicios, proyectos, portafolio, contacto, admin
│   ├── lib/            # seguridad, validación, base de datos, utilidades
│   ├── services/       # lógica de aplicación
│   └── types/
├── prisma/             # esquema y migraciones versionadas
├── tests/
├── docs/
├── .github/workflows/
├── Dockerfile
├── compose.yaml
└── ...
```

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
