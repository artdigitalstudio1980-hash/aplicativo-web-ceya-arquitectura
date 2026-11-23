# CI/CD — CEYA Arquitectura

> Estado: planificación. Los workflows se implementan en la FASE 8. No se publican imágenes ni se despliega a producción sin autorización.

## 1. Principios

- Pipelines reproducibles y con permisos mínimos.
- Acciones de terceros fijadas por SHA verificable.
- Sin secretos en logs; usar `secrets` del repositorio/entorno.
- Fallar el pipeline ante hallazgos críticos de seguridad.
- Despliegue con aprobación manual y posibilidad de rollback.

## 2. CI (pull request y push a `main`)

| Paso | Herramienta | Bloqueante |
|---|---|---|
| Checkout | `actions/checkout` (SHA fijo) | Sí |
| Node.js 24.14.0 | `actions/setup-node` + caché npm | Sí |
| Instalación | `npm ci` | Sí |
| Lint | ESLint | Sí |
| Tipos | `tsc --noEmit` | Sí |
| Pruebas | Vitest/Playwright según alcance | Sí |
| Auditoría | `npm audit --audit-level=high` | Sí |
| Build | `next build` | Sí |
| Secretos | Gitleaks | Sí |
| Análisis estático | CodeQL (repositorio público) | Sí |

## 3. Imagen Docker

- Build multi-stage (`deps` → `builder` → `runner`).
- Usuario no root, solo artefactos de producción.
- Escaneo con Trivy; fallo ante críticos sin mitigación documentada.
- Publicación en registro solo tras autorización.
- Etiquetas por commit SHA; nunca `latest` como única referencia.

## 4. CD (futuro)

- Entorno staging separado de producción.
- Despliegue por SSH con clave dedicada y usuario de mínimo privilegio.
- Aprobación manual para producción (GitHub Environments).
- Healthcheck posterior y verificación de flujo crítico.
- Rollback a la imagen/commit anterior documentado.

## 5. Permisos y seguridad del pipeline

```yaml
permissions:
  contents: read
```

- Elevar permisos solo en el job que los necesite.
- Evitar `pull_request_target` con checkout de código no confiable.
- No ejecutar secretos en PRs de forks.
- `concurrency` para cancelar ejecuciones obsoletas.
- Dependencias de Actions auditadas y actualizadas con revisión.

## 6. Plan de GitHub

- Repositorio **público**: CodeQL y secret scanning disponibles sin costo.
- Protección de `main` y reglas de revisión configurables.
- Environments con aprobación para producción.
- Si el repositorio pasa a privado, revisar disponibilidad de estas funciones en el plan contratado.

## 7. Criterios de aceptación

- Pipeline verde en `main`.
- Sin secretos detectados.
- Sin vulnerabilidades críticas abiertas.
- Build reproducible y healthcheck correcto.
- Rollback probado antes del primer despliegue real.
