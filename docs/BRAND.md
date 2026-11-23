# Identidad de Marca — CEYA Arquitectura

Resumen operativo basado en el **Manual de Identidad Corporativa CEYA v2.0 (2026–2027)**. El manual maestro, los PDFs y los vectores se mantienen **fuera del repositorio**; este documento solo define las reglas necesarias para implementar la interfaz.

## 1. Marca

- **Razón social:** Construcciones Especializadas y Arquitectura S.A.S.
- **Marca:** CEYA Arquitectura.
- **Promesa:** materializar la arquitectura con rigor técnico, precisión y excelencia constructiva, protegiendo y valorizando cada activo en el tiempo.
- **Posicionamiento:** firma de ingeniería técnica, diseño arquitectónico contemporáneo y construcción de alta precisión.

## 2. Paleta oficial

| Nombre | HEX | Uso |
|---|---|---|
| Rojo CEYA Corporativo | `#D62027` | Badge, CTA, acentos de marca |
| Negro Obsidiana | `#121316` | Tipografía principal, fondos oscuros |
| Blanco Puro | `#FFFFFF` | Contraste, texto sobre oscuro |
| Gris Acero Metalizado | `#8A95A5` | Detalles técnicos, bordes, texto secundario |
| Gris Titanio Profundo | `#475569` | Subtítulos, fondos secundarios UI |
| Aluminio Anodizado | `#CBD5E1` | Líneas de división, bordes de tarjetas |

### Gradiente corporativo "Acero Cepillado" (135°)

`#F1F5F9` → `#CBD5E1` (30%) → `#8A95A5` (65%) → `#475569` (100%). Uso decorativo puntual; no abusar en UI.

## 3. Tipografía

| Rol | Fuente | Pesos |
|---|---|---|
| Primaria | Montserrat | 500, 600, 700, 800 |
| Secundaria | Inter | 400, 500, 600 |
| Técnica | JetBrains Mono / Space Mono | 400, 500 |

- **CEYA:** Montserrat Bold/ExtraBold, caja alta.
- **ARQUITECTURA:** Montserrat SemiBold, caja alta, tracking expandido.
- El cuerpo de texto web usa Inter.

## 4. Logotipo

Versiones oficiales:

1. **Principal horizontal con badge rojo** — cabecera web, membretes, portadas.
2. **Dark mode** — fondos oscuros y UI dark.
3. **Horizontal limpio sin caja** — aplicaciones minimalistas y técnicas.
4. **Vertical apilado** — avatares, banderas, uniformes.

Reglas:

- Área de reserva mínima: altura de la columna del monograma CY.
- Tamaño mínimo digital: 130 px de ancho (horizontal) y 24 × 24 px (símbolo/favicon).
- Prohibido deformar, rotar, alterar colores, aplicar sombras o usar sobre fondos de bajo contraste.
- El símbolo CY combina el arco "C" y la columna/diagonal "Y"; no recrear la geometría a mano.

## 5. Tokens de diseño web

| Token | Valor |
|---|---|
| Fondo dominante | `#0B0C0E` |
| Tarjetas elevadas | `#16181D` |
| Borde arquitectónico | `1px solid rgba(203, 213, 225, 0.12)` |
| CTA primario | Fondo `#D62027`, texto blanco, radio 4 px |
| Botón secundario | Fondo `#262A33`, borde `#8A95A5`, texto `#CBD5E1` |
| Favicon | Símbolo CY dual blanco/rojo sobre fondo negro circular u octagonal |

La UI combina estética de estudio de arquitectura de lujo con solvencia ingenieril: dark UI dominante, tipografía amplia, jerarquía clara y animaciones discretas.

## 6. Submarcas

| Submarca | Color | Descriptor |
|---|---|---|
| CEYA Protect | `#0284C7` | Impermeabilización y protección estructural |
| CEYA Care | `#059669` | Mantenimiento integral y postventa |
| CEYA Plus | `#C5A059` | Arquitectura premium y proyectos de autor |

Cada submarca conserva el nombre CEYA y su apellido; no se usan como marcas independientes.

## 7. Gestión de assets

- Los archivos maestros (PDF, SVG, fotografías) viven en el entorno local de marca, no en el repositorio público.
- Cuando la implementación requiera un asset, se incorpora de forma deliberada y optimizada (SVG o WebP), con revisión de peso, licencia y autorización.
- No se publican catálogos, manuales ni imágenes de terceros sin permiso.
- No se incluyen datos de contacto personales en documentación ni en el código.
