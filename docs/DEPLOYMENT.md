# Despliegue — CEYA Arquitectura

> **Estado:** planificación. No hay VPS contratado ni despliegue a producción. Ninguna acción sobre DNS, correo o servidor se ejecuta sin autorización expresa.

## 1. Arquitectura objetivo

```text
Internet → HTTPS → Caddy (VPS) → Next.js frontend (contenedor) / Fastify backend (contenedor)
                                   ├── Frontend: Next.js en `/`
                                   ├── Backend: Fastify en `/api`
                                   ├── PostgreSQL (red interna)
                                   ├── almacenamiento de archivos
                                   └── OpenClaw (red aislada)
```

- Hostinger VPS con Ubuntu 24.04 LTS.
- Docker + Docker Compose para aplicación, base de datos y proxy.
- Caddy con TLS automático (Let's Encrypt).
- PostgreSQL sin puerto público.
- OpenClaw en red separada, sin acceso al host ni a la base de datos.

## 2. Requisitos previos

- Dominio transferido y DNS bajo control verificado.
- Registros de correo existentes identificados antes de cualquier cambio.
- Acceso SSH por clave, usuario con sudo y contraseña deshabilitada.
- Firewall con solo 22, 80 y 443 expuestos (SSH restringido por IP cuando sea posible).
- Secretos definidos en el servidor, nunca en el repositorio.
- Backup y rollback probados antes de habilitar producción.

## 3. Fases de despliegue

1. **Inspección del servidor:** SO, recursos, disco, red, servicios existentes.
2. **Endurecimiento:** actualizaciones, usuario de despliegue, SSH por clave, fail2ban, firewall.
3. **Docker:** instalación oficial, usuario en grupo `docker`, límites de recursos.
4. **Proxy y TLS:** Caddy, dominio, certificados y renovación automática.
5. **Aplicación:** imagen multi-stage, usuario no root, healthcheck, variables de entorno.
6. **Base de datos:** PostgreSQL interno, migraciones controladas, usuario de mínimo privilegio.
7. **Archivos:** volumen persistente con permisos restringidos.
8. **Observabilidad:** logs, métricas, alertas y healthchecks.
9. **Backups:** base de datos y archivos, cifrados y fuera del servidor.
10. **Aceptación:** pruebas funcionales, de seguridad y de carga.
11. **Rollback:** imagen anterior, migración reversible o restauración de backup.

## 4. DNS y correo

- El dominio está en proceso de transferencia; no se modifican registros hasta confirmar el estado.
- Antes de tocar MX, SPF, DKIM o DMARC, verificar qué servicios de correo están en uso.
- Los cambios de DNS se hacen con TTL bajo, ventana controlada y autorización.
- HTTPS se valida con el dominio real; no se usan certificados autofirmados en producción.

## 5. Secretos y configuración

- Variables inyectadas por el entorno del contenedor o un gestor de secretos.
- Rotación de claves y tokens con caducidad.
- Sin secretos en imágenes Docker, repositorio, logs ni documentación.
- `.env` de producción fuera del árbol del proyecto y con permisos `600`.

## 6. Backups y recuperación

- `pg_dump` diario + archivos; retención definida y almacenamiento externo cifrado.
- Prueba de restauración documentada antes de producción.
- Registro de fecha, tamaño y resultado de cada backup.
- Procedimiento de recuperación con tiempos objetivo (RPO/RTO) acordados.

## 7. Rollback

1. Detener el servicio afectado.
2. Volver a la imagen/commit anterior.
3. Restaurar migración o backup si el esquema cambió.
4. Verificar healthcheck y flujo crítico.
5. Registrar el incidente y la causa.

## 8. Criterios de aceptación

- HTTPS válido y redirección desde HTTP.
- Cabeceras de seguridad activas.
- Login y panel administrativo protegidos.
- Formulario de contacto con rate limiting y antispam.
- Base de datos sin exposición pública.
- Backups y restauración verificados.
- Sin hallazgos críticos en Trivy, Gitleaks, `npm audit` ni ZAP.
