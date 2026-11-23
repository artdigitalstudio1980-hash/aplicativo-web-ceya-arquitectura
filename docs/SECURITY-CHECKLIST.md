# Checklist de Seguridad — CEYA Arquitectura

Marcar solo cuando el control esté implementado y verificado. Un control desactivado para "pasar" el build es un fallo de seguridad.

## 1. Repositorio y secretos

- [ ] Repositorio sin credenciales, tokens, claves ni archivos `.env` reales.
- [ ] `.gitignore` cubre entornos, logs, cobertura, artefactos y recursos de marca locales.
- [ ] `.env.example` solo contiene nombres de variables.
- [ ] Gitleaks activo en CI y en pre-commit (cuando se configure).
- [ ] Secret scanning de GitHub activo.
- [ ] Tokens de GitHub de grano fino, con caducidad y permisos mínimos.
- [ ] Rotación documentada ante filtración.

## 2. Código

- [ ] ESLint sin errores bloqueantes.
- [ ] TypeScript estricto y `tsc --noEmit` en verde.
- [ ] Validación Zod en formularios y Route Handlers.
- [ ] Autorización verificada en servidor en cada operación sensible.
- [ ] Manejo de errores sin filtrar trazas, SQL ni rutas internas.
- [ ] Protección XSS: escape por defecto, sanitización de HTML enriquecido.
- [ ] CSRF evaluado y mitigado donde aplique.
- [ ] Sin `eval`, `innerHTML` inseguro ni ejecución de entrada no confiable.

## 3. Dependencias

- [ ] Versiones estables y compatibles; lockfile versionado.
- [ ] `npm audit --audit-level=high` sin hallazgos críticos.
- [ ] Dependabot configurado.
- [ ] Revisión manual de cambios mayores.
- [ ] Sin dependencias abandonadas o innecesarias.

## 4. Autenticación y sesiones

- [ ] Contraseñas con hash seguro (Argon2id/bcrypt) y política de fortaleza.
- [ ] Cookies `HttpOnly`, `Secure` en producción y `SameSite` adecuado.
- [ ] Límite de intentos y bloqueo progresivo.
- [ ] Sesiones con caducidad, rotación y revocación.
- [ ] Recuperación de contraseña con token de un solo uso y caducidad.
- [ ] Roles y permisos verificados en backend.
- [ ] Registro de eventos de autenticación y autorización.

## 5. Entradas y API

- [ ] Validación de tipo, longitud, formato y rango en servidor.
- [ ] Consultas parametrizadas; sin SQL concatenado.
- [ ] Rate limiting en login, contacto, cotizaciones y API pública.
- [ ] Antispam (honeypot, tiempo mínimo, captcha o equivalente).
- [ ] Respuestas de error genéricas para el cliente.
- [ ] Límites de tamaño de payload y de subida de archivos.
- [ ] Validación de tipo real de archivos y almacenamiento seguro.

## 6. Base de datos

- [ ] PostgreSQL sin exposición pública.
- [ ] Usuario de aplicación con mínimo privilegio.
- [ ] Migraciones versionadas y revisadas.
- [ ] Índices y restricciones de integridad.
- [ ] Backups cifrados y restauración probada.
- [ ] Datos personales minimizados y con retención definida.
- [ ] IPs almacenadas como hash cuando se requieran.

## 7. HTTP y navegador

- [ ] HTTPS obligatorio y redirección desde HTTP.
- [ ] HSTS en producción.
- [ ] Content-Security-Policy basada en recursos reales.
- [ ] `X-Content-Type-Options: nosniff`.
- [ ] `Referrer-Policy` adecuada.
- [ ] `Permissions-Policy` restrictiva.
- [ ] Sin `X-Powered-By` ni versiones expuestas.
- [ ] Cookies y almacenamiento local sin datos sensibles.

## 8. Contenedores

- [ ] Dockerfile multi-stage con imagen oficial y versión fijada.
- [ ] Usuario no root.
- [ ] Solo dependencias de producción en la imagen final.
- [ ] `.dockerignore` completo.
- [ ] Sin secretos en capas ni variables de build.
- [ ] Healthcheck y límites de recursos.
- [ ] Red interna; PostgreSQL y OpenClaw sin puertos públicos.
- [ ] Trivy sin vulnerabilidades críticas sin mitigar.

## 9. CI/CD

- [ ] Workflows con `permissions` mínimos.
- [ ] Acciones de terceros fijadas por SHA.
- [ ] Sin `pull_request_target` inseguro ni ejecución de código no confiable con secretos.
- [ ] Gitleaks, lint, typecheck, pruebas, auditoría y build como gates.
- [ ] CodeQL activo (repositorio público).
- [ ] Protección de `main` y revisión obligatoria.
- [ ] Despliegue con aprobación manual y healthcheck posterior.
- [ ] Rollback documentado y probado.

## 10. IA y agentes

- [ ] OpenClaw en red aislada, sin acceso directo a PostgreSQL ni al host.
- [ ] Identidad propia por agente y permisos mínimos.
- [ ] Allowlist de herramientas; sin comandos arbitrarios.
- [ ] Aprobación humana para acciones sensibles.
- [ ] Auditoría de acciones y límites de ejecución.
- [ ] Defensa ante prompt injection y fuga de datos.
- [ ] Sin secretos en prompts, logs ni memoria del agente.
- [ ] Revisión de salidas antes de publicar o enviar.

## 11. Correo

- [ ] SPF, DKIM y DMARC configurados y verificados.
- [ ] Cuenta de envío con permisos limitados.
- [ ] Validación de destinatarios y límites de envío.
- [ ] Contenido de correo sin datos sensibles innecesarios.
- [ ] Registro de envíos y rebotes.

## 12. Privacidad y cumplimiento

- [ ] Aviso de privacidad y autorización de tratamiento de datos.
- [ ] Minimización y finalidad definida.
- [ ] Procedimiento de acceso, corrección y eliminación.
- [ ] Retención y borrado seguro.
- [ ] Ley 1581 de Colombia evaluada con asesoría legal.

## 13. Respuesta a incidentes

- [ ] Canal privado de reporte (GitHub Security Advisories).
- [ ] Responsables y plazos definidos.
- [ ] Procedimiento de revocación de secretos y sesiones.
- [ ] Preservación de evidencia y registro del incidente.
- [ ] Comunicación a afectados según obligación legal.
