# Base de Datos — CEYA Arquitectura

## 1. Motor y acceso

- **PostgreSQL 16** en contenedor, red interna de Docker.
- Sin exposición pública del puerto de base de datos.
- Acceso exclusivo desde la aplicación y tareas administrativas controladas.
- ORM: **Prisma 7.10.1** (estable). Migraciones versionadas con Prisma Migrate.
- Consultas parametrizadas; prohibido concatenar SQL con entrada de usuario.

## 2. Modelo inicial

### Identidad y acceso

| Entidad | Campos principales |
|---|---|
| `User` | `id`, `email` (único), `passwordHash`, `name`, `roleId`, `isActive`, `lastLoginAt`, `createdAt`, `updatedAt` |
| `Role` | `id`, `name` (único), `description` |
| `Permission` | `id`, `code` (único), `description` |
| `RolePermission` | `roleId`, `permissionId` |
| `Session` | `id`, `userId`, `tokenHash`, `expiresAt`, `ipHash`, `userAgent`, `createdAt` |

- Contraseñas con hash seguro (Argon2id o bcrypt con costo adecuado); nunca en texto plano.
- Sesiones revocables; tokens almacenados como hash.
- Roles previstos: `ADMIN`, `EDITOR`, `COMMERCIAL`, `AGENT` (mínimo privilegio).

### Contenido

| Entidad | Campos principales |
|---|---|
| `Service` | `id`, `slug` (único), `name`, `line` (`PROTECT`/`CARE`/`PLUS`/`ARCHITECTURE`), `summary`, `description`, `features` (JSON), `published`, `sortOrder`, `seoTitle`, `seoDescription` |
| `Project` | `id`, `slug` (único), `name`, `description`, `categoryId`, `location` (opcional y autorizada), `projectDate`, `status`, `published`, `featured`, `seoTitle`, `seoDescription` |
| `Product` | `id`, `slug` (único), `sku` (único), `name`, `description`, `categoryId`, `specs` (JSON), `quoteOnly` (por defecto `true`), `priceCents` (opcional), `currency` (`COP`), `published`, `featured`, `sortOrder` |
| `Category` | `id`, `slug` (único), `name`, `type` (`PRODUCT`/`PROJECT`/`SERVICE`), `sortOrder` |
| `Media` | `id`, `url`, `alt`, `mimeType`, `width`, `height`, `sizeBytes`, `createdAt` |
| `ServiceMedia`, `ProjectMedia`, `ProductMedia` | Relaciones ordenadas con `sortOrder` |

- Los precios de proveedor y márgenes **no** se almacenan en campos públicos.
- `priceCents` solo se usa si el precio es autorizado para publicación; por defecto el producto es "solo cotización".
- Ubicación de proyectos solo si el cliente autoriza su publicación.

### Comercial

| Entidad | Campos principales |
|---|---|
| `Quote` | `id`, `reference` (único), `customerName`, `email`, `phone`, `company`, `message`, `status` (`NEW`/`REVIEWING`/`QUOTED`/`ACCEPTED`/`REJECTED`/`CLOSED`), `assignedToId`, `totalCents`, `currency`, `createdAt`, `updatedAt` |
| `QuoteItem` | `id`, `quoteId`, `productId`, `serviceId`, `description`, `quantity`, `unitPriceCents`, `subtotalCents` |
| `ContactMessage` | `id`, `name`, `email`, `phone`, `subject`, `message`, `status` (`NEW`/`READ`/`REPLIED`/`ARCHIVED`), `ipHash`, `createdAt` |
| `EmailMessage` | `id`, `direction` (`INBOUND`/`OUTBOUND`), `fromAddress`, `toAddress`, `subject`, `bodyText`, `status`, `relatedQuoteId`, `relatedContactId`, `createdAt` |

- `reference` de cotización generada por el servidor (no predecible).
- Totales calculados y validados en servidor; nunca confiar en el cliente.

### Operación y auditoría

| Entidad | Campos principales |
|---|---|
| `AuditLog` | `id`, `actorType` (`USER`/`AGENT`/`SYSTEM`), `actorId`, `action`, `entity`, `entityId`, `metadata` (JSON redactado), `ipHash`, `createdAt` |
| `Agent` | `id`, `name`, `role`, `isActive`, `createdAt` |
| `SiteSetting` | `key` (único), `value` (JSON), `updatedAt` |

- `AuditLog` es append-only para la aplicación.
- `metadata` no debe contener secretos ni datos personales innecesarios.

## 3. Índices y restricciones

- Índices únicos en `email`, `slug`, `sku`, `reference`.
- Índices de consulta: `Product(categoryId, published)`, `Project(categoryId, published, projectDate)`, `Quote(status, createdAt)`, `ContactMessage(status, createdAt)`, `AuditLog(createdAt)`, `AuditLog(entity, entityId)`.
- Claves foráneas con `RESTRICT` para contenido referenciado y `CASCADE` solo en relaciones dependientes (ítems de cotización, relaciones de medios).
- Restricciones: `quantity > 0`, `unitPriceCents >= 0`, `totalCents >= 0`, `expiresAt > createdAt` en sesiones.

## 4. Migraciones

- Cada cambio de esquema genera una migración versionada y revisada.
- Prohibido `db push` en staging/producción.
- Migraciones destructivas requieren backup previo, ventana de mantenimiento y autorización.
- Los datos de prueba se cargan con scripts separados; nunca datos reales de clientes.

## 5. Respaldos y recuperación

- `pg_dump` programado (diario en producción), cifrado en reposo.
- Retención mínima: 7 diarios, 4 semanales, 3 mensuales (ajustable).
- Prueba de restauración documentada y periódica.
- Los backups se almacenan fuera del contenedor y de la base de datos.

## 6. Privacidad

- Minimización de datos personales; no se solicitan documentos de identidad.
- IPs almacenadas como hash cuando se requieran para seguridad.
- Política de retención y eliminación de mensajes y cotizaciones.
- Cumplimiento de la Ley 1581 de Colombia y autorización de tratamiento de datos en formularios.
