# Decisiones de Arquitectura (ADR)

Registro breve de decisiones relevantes. Cada ADR indica contexto, decisión, consecuencias y estado.

## ADR-001 — Repositorio público durante el desarrollo

- **Estado:** aceptada.
- **Contexto:** se necesita colaboración, CI y controles de seguridad sin costo adicional mientras se construye la plataforma.
- **Decisión:** usar un repositorio público sin secretos ni datos sensibles; los recursos de marca y catálogos permanecen fuera.
- **Consecuencias:** habilita CodeQL y secret scanning; exige disciplina estricta de no incluir PII, credenciales ni documentos internos. Revisar visibilidad antes de producción.

## ADR-002 — Node.js 24.14.0

- **Estado:** aceptada.
- **Contexto:** Next.js 16 requiere Node >= 20.9; el entorno local tiene 24.14.0 y 22.23.1.
- **Decisión:** fijar 24.14.0 en `.nvmrc`, `engines` y CI; usar `node:24-bookworm-slim` en Docker.
- **Consecuencias:** consistencia entre local, CI y contenedor; no actualizar sin validar compatibilidad.

## ADR-003 — Next.js 16 + React 19 + Tailwind 4

- **Estado:** aceptada.
- **Contexto:** se requiere un framework único para frontend, backend y API, con buen soporte de SSR y SEO.
- **Decisión:** Next.js 16 (App Router), React 19 y Tailwind 4.
- **Consecuencias:** versiones recientes; validar estabilidad de dependencias y documentación en FASE 1.

## ADR-004 — PostgreSQL 16 + Prisma 7.10.1

- **Estado:** aceptada.
- **Contexto:** se necesita integridad relacional, migraciones y consultas seguras.
- **Decisión:** PostgreSQL 16 en contenedor y Prisma 7.10.1 estable.
- **Consecuencias:** no adoptar Prisma 8 RC; migraciones versionadas y backups obligatorios.

## ADR-005 — Hosting en VPS, no compartido

- **Estado:** aceptada (contratación diferida).
- **Contexto:** la plataforma requiere Docker, PostgreSQL, proxy propio y aislamiento de agentes.
- **Decisión:** desplegar en VPS Hostinger (KVM 2 recomendado) cuando el proyecto esté listo y el usuario autorice.
- **Consecuencias:** mayor control y seguridad; requiere administración, backups y monitoreo.

## ADR-006 — OpenClaw aislado con herramientas vía API

- **Estado:** aceptada.
- **Contexto:** la IA debe automatizar atención y administración sin acceso irrestricto.
- **Decisión:** OpenClaw en red Docker aislada; agentes con identidad, permisos, allowlist de herramientas, auditoría y aprobación humana.
- **Consecuencias:** más trabajo de integración; reduce riesgo de acciones destructivas o fuga de datos.

## ADR-007 — Cotización antes que pago en línea

- **Estado:** propuesta.
- **Contexto:** el modelo comercial combina productos de terceros y servicios; los precios finales dependen de alcance y condiciones.
- **Decisión:** lanzar con catálogo y solicitud de cotización; evaluar pagos después.
- **Consecuencias:** menor complejidad legal y técnica inicial; requiere proceso comercial claro y tiempos de respuesta.

## ADR-008 — Sin binarios de marca en el repositorio (inicialmente)

- **Estado:** aceptada.
- **Contexto:** el repositorio es público y los recursos de marca son propiedad intelectual.
- **Decisión:** mantener PDFs, SVG y fotografías fuera del repositorio; incorporar solo assets optimizados y autorizados cuando la implementación los requiera.
- **Consecuencias:** evita filtrar documentos internos; exige un paso controlado de incorporación de assets en FASE 2.
