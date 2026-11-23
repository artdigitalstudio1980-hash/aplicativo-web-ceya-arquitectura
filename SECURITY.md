# Política de Seguridad — CEYA Arquitectura

La seguridad es un requisito transversal del proyecto, no una fase final. Este documento define cómo reportar vulnerabilidades y qué controles mínimos aplican al repositorio y a la plataforma.

## Versiones soportadas

El proyecto está en desarrollo pre-productivo. Solo la rama `main` recibe correcciones de seguridad.

| Versión | Soporte |
|---|---|
| `main` (pre-release) | Sí |
| Ramas de funcionalidad | No |

## Reporte de vulnerabilidades

- Usa **GitHub Security Advisories** (reporte privado de vulnerabilidades) del repositorio.
- No publiques detalles explotables en issues, discusiones ni redes sociales.
- Incluye: descripción, impacto, pasos de reproducción, versión/commit afectado y mitigación sugerida si la conoces.
- Objetivo de respuesta inicial: 72 horas hábiles. La corrección se coordina en privado y se divulga después del despliegue del arreglo.

No se solicitan credenciales por chat ni por correo. No se aceptan pruebas contra producción sin autorización escrita.

## Principios

- Mínimo privilegio en usuarios, roles, tokens, contenedores y agentes de IA.
- Defensa en profundidad: validación en frontend **y** backend, autorización en servidor.
- Configuración segura por defecto; nada sensible expuesto salvo decisión explícita.
- Secretos fuera del repositorio, rotables y con alcance mínimo.
- Registro y auditoría de operaciones sensibles.
- Dependencias estables, mantenidas y auditadas.

## Controles obligatorios

| Área | Control |
|---|---|
| Código | ESLint, TypeScript estricto, revisión de cambios |
| Entradas | Validación con Zod en cliente y servidor |
| Secretos | Gitleaks en CI; `.env` ignorado; sin claves en código |
| Dependencias | `npm audit` + Dependabot |
| Análisis estático | CodeQL (repositorio público) |
| Contenedores | Imagen multi-stage, usuario no root, Trivy |
| Pruebas dinámicas | OWASP ZAP solo en entorno de pruebas |
| HTTP | CSP, HSTS en producción, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` |
| Autenticación | Cookies `HttpOnly`, `Secure` en producción, `SameSite`; límite de intentos |
| Base de datos | Consultas parametrizadas, migraciones versionadas, backups |
| IA | Aislamiento de OpenClaw, allowlist de herramientas, aprobación humana, defensa ante prompt injection |
| Datos | Minimización de datos personales; Ley 1581 de Colombia |

## Gestión de secretos

- Los valores reales viven en el gestor de secretos del entorno o en variables de entorno del servidor.
- `.env.example` solo contiene nombres de variables y valores locales no sensibles.
- Si un secreto se filtra: revocarlo, rotarlo, revisar logs de uso y documentar el incidente.
- Los tokens de GitHub y de proveedores deben ser de grano fino y con caducidad.

## Alcance

Aplican estos controles a la aplicación web, API, autenticación, base de datos, contenedores, pipelines CI/CD, integraciones de correo y agentes de IA.
