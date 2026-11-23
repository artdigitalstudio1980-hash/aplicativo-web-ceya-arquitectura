# Resumen del Proyecto — CEYA Arquitectura

## 1. Empresa

- **Razón social:** Construcciones Especializadas y Arquitectura S.A.S.
- **Marca:** CEYA Arquitectura.
- **País:** Colombia. Cobertura comercial objetivo: Bogotá D.C., Antioquia, Valle del Cauca, Eje Cafetero, Santanderes y Costa Caribe.
- **Dominio:** `ceyaarquitectura.com` (en proceso de transferencia al proveedor de hosting; no se modifican DNS ni correo sin autorización).

## 2. Modelo de negocio

CEYA **no fabrica** los productos de mobiliario y cubiertas: los comercializa e integra en sus proyectos. La operación combina dos fuentes de ingreso:

1. **Productos TOSCANA:** mobiliario exterior, pérgolas y cubrimientos, cerramientos y soluciones complementarias.
2. **Servicios propios de arquitectura, ingeniería y construcción**, organizados en tres líneas de marca:
   - **CEYA Protect:** impermeabilización y protección estructural.
   - **CEYA Care:** mantenimiento integral y postventa (facility management).
   - **CEYA Plus:** arquitectura premium y proyectos de autor.

La plataforma web es el canal central: presenta la marca, el catálogo, el portafolio y habilita cotizaciones y contacto. La capa de IA automatiza atención, cotización y tareas administrativas con aprobación humana.

## 3. Audiencias

| Audiencia | Necesidad principal |
|---|---|
| Cliente particular | Explorar productos y servicios, solicitar cotización, ver proyectos |
| Administrador de propiedad horizontal | Mantenimiento, impermeabilización, soluciones por contrato |
| Empresa / retail / institución | Adecuaciones, mantenimiento multisede, proyectos corporativos |
| Equipo CEYA | Gestionar contenido, productos, proyectos, mensajes y cotizaciones |

## 4. Alcance funcional

### Público
- Página principal con propuesta de valor, servicios, proyectos destacados y contacto.
- Servicios CEYA (Protect, Care, Plus) administrables.
- Catálogo de productos TOSCANA con categorías, fichas, imágenes y estado de publicación.
- Portafolio de proyectos con categoría, fecha, estado y ubicación solo si se autoriza.
- Formulario de contacto con validación, antispam y límite de solicitudes.
- Cotización: solicitud guiada y respuesta; el precio final se confirma por el equipo comercial.
- Canales de atención: web y correo; WhatsApp y otros canales por confirmar.

### Administración
- Autenticación y autorización por roles.
- Gestión de servicios, productos, proyectos, imágenes, contenido, mensajes y cotizaciones.
- Auditoría de operaciones sensibles.
- Configuración autorizada del sitio.

### IA (OpenClaw)
- Atención al cliente y clasificación de solicitudes.
- Apoyo en cotizaciones con motor determinista de precios; la IA no inventa valores.
- Redacción y gestión de correo con aprobación humana.
- Operaciones administrativas limitadas por permisos, con registro y aprobación.

## 5. Fuera de alcance inicial

- Pago en línea (se evalúa después de definir pasarela y requisitos legales).
- Integraciones no confirmadas con TOSCANA (API, feed o ERP).
- App móvil nativa.
- Despliegue a producción y contratación de VPS hasta autorización expresa.
- Publicación de datos de contacto, direcciones o documentos internos sin validación.

## 6. Decisiones abiertas

1. ¿Venta en línea con pago o catálogo con cotización? (recomendación inicial: cotización).
2. ¿TOSCANA entregará API/feed de productos o se carga el catálogo manualmente?
3. ¿WhatsApp será canal oficial de atención con IA?
4. ¿Qué buzón corporativo se usará para notificaciones y quién lo administra?
5. ¿Qué acciones del agente administrativo requieren aprobación humana obligatoria?
6. ¿Se dispone de fotografías propias de proyectos y logo vectorial definitivo para producción?
7. Presupuesto operativo de IA e infraestructura.

## 7. Criterios de éxito

- Sitio rápido, accesible y responsive, con identidad CEYA consistente.
- Cotizaciones y mensajes recibidos sin pérdidas y con trazabilidad.
- Administración protegida y auditable.
- Cero secretos o datos personales en el repositorio público.
- Pipeline CI/CD con controles de seguridad antes de cada despliegue.

## 8. Datos que no se publican

- Datos personales de clientes, empleados o aliados.
- Teléfonos, correos personales, direcciones privadas y documentos de identidad.
- Precios de proveedores, márgenes y condiciones comerciales internas.
- Credenciales, tokens, claves, direcciones IP privadas y configuraciones de infraestructura.
- Catálogos y manuales de terceros sin autorización de publicación.
