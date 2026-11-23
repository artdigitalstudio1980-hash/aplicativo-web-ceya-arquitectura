# INSTRUCCIONES MAESTRAS — CEYA ARQUITECTURA

## Construcción integral de la plataforma web con enfoque DevSecOps

| Campo | Valor |
|---|---|
| **Nombre del proyecto** | CEYA Arquitectura |
| **Directorio** | `aplicativo-web-ceya-arquitectura` |
| **Dominio** | `ceyaarquitectura.com` |
| **Sistema de desarrollo** | Ubuntu 24.04 |
| **Metodología** | Desarrollo por fases, automatización, seguridad desde el diseño y despliegue continuo |
| **Estado actual** | FASE 0 completada — FASE 1 pendiente |
| **Documento creado** | 2026-11-20 |

---

## 1. ROL Y RESPONSABILIDADES DEL AGENTE

Actúa como un equipo multidisciplinario de ingeniería de software, con los siguientes perfiles:

- Arquitecto de software senior.
- Ingeniero Full Stack especializado en Next.js y TypeScript.
- Ingeniero DevSecOps.
- Especialista en Docker y Linux.
- Especialista en PostgreSQL.
- Ingeniero de infraestructura Cloud y CI/CD.
- Especialista en seguridad de aplicaciones web.
- Diseñador UX/UI especializado en arquitectura y construcción.
- Especialista en integración de agentes de inteligencia artificial.

Tu responsabilidad es diseñar, desarrollar, probar, documentar y preparar para producción la plataforma web de CEYA Arquitectura.

No te limites a generar código. Debes construir una aplicación funcional, mantenible, segura, escalable y preparada para operar en producción.

**La seguridad es un requisito obligatorio y transversal. No es una tarea que se agrega al finalizar el desarrollo.**

> **Repositorio público durante el desarrollo:** no incluir datos personales, credenciales, claves, precios de proveedores, direcciones privadas ni información confidencial. Los recursos de marca, catálogos y documentos internos se mantienen fuera del repositorio.

---

## 2. REGLAS OBLIGATORIAS DE TRABAJO

1. Antes de modificar archivos, inspecciona el entorno, el directorio y cualquier código existente.
2. No sobrescribas ni elimines archivos sin comprobar su contenido.
3. Conserva los componentes, configuraciones y recursos que sean válidos.
4. No inventes credenciales, dominios, identificadores, direcciones de correo ni configuraciones de infraestructura.
5. No almacenes secretos en el código fuente.
6. No utilices versiones obsoletas o dependencias sin mantenimiento.
7. Utiliza versiones estables y compatibles entre sí.
8. Prioriza dependencias oficiales y mantenidas.
9. Implementa validación tanto en frontend como en backend.
10. Aplica el principio de mínimo privilegio.
11. Cada funcionalidad debe tener pruebas.
12. Ejecuta los controles de seguridad después de cada fase importante.
13. Documenta los comandos, configuraciones y decisiones arquitectónicas.
14. No declares una funcionalidad terminada si no ha sido probada.
15. No ocultes errores ni desactives controles para conseguir que una compilación pase.

### Autorizaciones

Puedes realizar autónomamente operaciones locales y reversibles de inspección, creación de archivos del proyecto, instalación de dependencias y ejecución de pruebas.

Debes solicitar autorización antes de:

- Eliminar información o modificar archivos externos al proyecto.
- Cambiar DNS o configuraciones del dominio.
- Modificar servicios de correo.
- Crear o modificar recursos de producción.
- Publicar imágenes o contenedores.
- Ejecutar migraciones destructivas.
- Modificar firewall, SSH o políticas de acceso del VPS.
- Desplegar a producción.
- Exponer servicios a Internet.
- Ejecutar acciones sensibles mediante agentes de IA.

No solicites credenciales por el chat ni las escribas en archivos de documentación.

---

## 3. ENTORNO DE DESARROLLO

El equipo dispone de las siguientes versiones informadas:

| Componente | Versión |
|---|---|
| Ubuntu | 24.04 |
| Node.js | 24.14.0 |
| npm | 11.9.0 |
| Docker | 29.1.3 |
| Git | 2.43.0 |

Primero verifica las versiones reales:

```bash
node -v
npm -v
docker --version
docker compose version
git --version
docker info
```

Comprueba también:

- Espacio disponible.
- Memoria disponible.
- Arquitectura del sistema.
- Disponibilidad de NVM.
- Configuración de Docker.
- Estado de Git.
- Herramientas de desarrollo instaladas.

No actualices Node.js automáticamente. Evalúa la compatibilidad de Next.js, sus dependencias y Docker. Node.js 24 puede utilizarse como punto de partida. Recomienda una actualización únicamente cuando exista una razón técnica comprobable.

---

## 4. ARQUITECTURA TECNOLÓGICA

Construye la solución con esta arquitectura objetivo:

| Componente | Tecnología |
|---|---|
| Frontend | Next.js |
| Backend | Next.js Route Handlers / servicios |
| Lenguaje | TypeScript |
| Interfaz | Tailwind CSS |
| Base de datos | PostgreSQL |
| ORM | Prisma o alternativa justificada |
| Validación | Zod |
| Contenedores | Docker |
| Orquestación | Docker Compose |
| Versionamiento | Git y GitHub |
| CI/CD | GitHub Actions |
| Infraestructura | Hostinger VPS |
| Proxy inverso | Caddy o Nginx |
| Seguridad | DevSecOps |
| Agentes de IA | OpenClaw |

Evalúa las decisiones de arquitectura antes de incorporar dependencias adicionales.

No instales tecnologías que no tengan una función concreta.

### Arquitectura lógica esperada

```text
                    INTERNET
                       |
                       |
                HTTPS / TLS
                       |
                       |
                REVERSE PROXY
                       |
                       |
                 NEXT.JS APP
                       |
          +------------+------------+
          |            |            |
          |            |            |
       FRONTEND     BACKEND      AUTH
                       |
                       |
                 APPLICATION
                    SERVICES
                       |
             +---------+---------+
             |                   |
             |                   |
         POSTGRESQL          FILE STORAGE
             |
             |
       BACKUPS / LOGS


          ENTORNO AISLADO
                 |
              OPENCLAW
                 |
          AGENTES DE IA
                 |
       TOOLS / PERMISOS LIMITADOS
```

La comunicación entre los servicios debe realizarse mediante redes y mecanismos controlados.

OpenClaw no debe convertirse en una interfaz pública ni tener acceso irrestricto al backend, a la base de datos o al servidor.

---

## 5. CREACIÓN DEL PROYECTO

Ubícate en el directorio de trabajo:

```bash
mkdir -p ~/Proyectos
cd ~/Proyectos
```

Verifica que no exista ya el directorio:

```bash
ls -la
```

Si no existe, crea el proyecto:

```bash
npx create-next-app@latest aplicativo-web-ceya-arquitectura \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

Entra al directorio:

```bash
cd aplicativo-web-ceya-arquitectura
```

Si ya existe un proyecto, inspecciona su estructura y reutiliza el trabajo válido. No lo reemplaces.

Configura y comprueba:

```bash
npm install
npm run dev
```

Verifica la aplicación en:

```text
http://localhost:3000
```

Ejecuta:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Corrige cualquier error antes de continuar.

---

## 6. ESTRUCTURA DEL PROYECTO

Diseña una estructura organizada y modular, adaptada a las funcionalidades reales:

```text
aplicativo-web-ceya-arquitectura/
│
├── public/
│   ├── images/
│   ├── logos/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (admin)/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── portfolio/
│   │   ├── contact/
│   │   └── administration/
│   │
│   ├── lib/
│   │   ├── security/
│   │   ├── validation/
│   │   ├── database/
│   │   └── utilities/
│   │
│   ├── services/
│   ├── types/
│   └── styles/
│
├── prisma/
│
├── tests/
│
├── docs/
│
├── .github/
│   └── workflows/
│
├── Dockerfile
├── compose.yaml
├── .dockerignore
├── .env.example
├── .gitignore
├── .nvmrc
├── AGENTS.md
├── SECURITY.md
├── README.md
└── package.json
```

No es obligatorio crear todas las carpetas desde el principio. Genera cada módulo cuando se implemente su funcionalidad.

---

## 7. DISEÑO Y EXPERIENCIA DE USUARIO

La plataforma debe tener una identidad visual profesional, moderna y relacionada con arquitectura, diseño y construcción.

Investiga los recursos de identidad de CEYA que estén disponibles localmente o hayan sido proporcionados para el proyecto.

No inventes un logotipo oficial ni reemplaces la identidad existente.

Objetivos de diseño:

- Diseño profesional y elegante.
- Interfaz moderna.
- Navegación intuitiva.
- Diseño responsive.
- Excelente experiencia móvil.
- Carga rápida.
- Accesibilidad.
- Jerarquía visual clara.
- Imágenes optimizadas.
- Tipografías coherentes.
- Animaciones discretas y funcionales.

Antes de diseñar, identifica los recursos gráficos existentes y presenta una propuesta visual coherente.

No utilices imágenes con derechos desconocidos. Prioriza recursos propios o autorizados.

---

## 8. FUNCIONALIDADES DE LA PLATAFORMA

Diseña inicialmente los siguientes módulos:

### 8.1. Página principal

Debe presentar:

- Identidad de CEYA Arquitectura.
- Propuesta de valor.
- Servicios principales.
- Proyectos destacados.
- Galería visual.
- Información de contacto.
- Llamadas a la acción.

### 8.2. Servicios

Sistema administrable para mostrar los servicios de arquitectura, construcción y demás actividades reales de la empresa.

Cada servicio debe tener:

- Nombre.
- Descripción.
- Imagen.
- Características.
- Galería cuando corresponda.
- Estado de publicación.

No inventes servicios que no hayan sido confirmados.

### 8.3. Portafolio de proyectos

Permitir mostrar proyectos con:

- Nombre.
- Descripción.
- Ubicación, cuando se autorice su publicación.
- Fotografías.
- Categoría.
- Fecha.
- Estado.

### 8.4. Contacto

Implementar:

- Formulario de contacto.
- Validación de datos.
- Protección contra spam.
- Limitación de solicitudes.
- Confirmación de recepción.
- Manejo seguro de errores.

No publicar direcciones privadas ni datos de contacto no confirmados.

### 8.5. Panel administrativo

Diseñar un panel privado que permita gestionar:

- Servicios.
- Proyectos.
- Imágenes.
- Contenido.
- Mensajes recibidos.
- Usuarios y roles.
- Configuración autorizada.

El acceso debe estar protegido mediante autenticación y autorización en backend.

---

## 9. BASE DE DATOS

Implementa PostgreSQL mediante Docker Compose.

Diseña un modelo de datos que responda a los módulos reales.

Evalúa entidades como:

- Usuarios.
- Roles.
- Permisos.
- Servicios.
- Proyectos.
- Categorías.
- Imágenes.
- Mensajes de contacto.
- Auditoría.

Requisitos:

- Migraciones versionadas.
- Integridad referencial.
- Índices apropiados.
- Consultas parametrizadas.
- Restricciones de acceso.
- Validación de entradas.
- Manejo de transacciones.
- Backups y restauración.

No expongas PostgreSQL directamente a Internet.

No almacenes contraseñas en texto plano. Utiliza un mecanismo de hashing de contraseñas seguro si implementas autenticación propia.

---

## 10. AUTENTICACIÓN Y AUTORIZACIÓN

Diseña un sistema seguro para el panel administrativo.

Debe contemplar:

- Inicio y cierre de sesión.
- Gestión de sesiones.
- Recuperación segura de contraseña.
- Roles.
- Permisos.
- Protección de rutas.
- Protección de endpoints.
- Límites de intentos.
- Registro de eventos de seguridad.

No confíes exclusivamente en ocultar botones o rutas del frontend.

Cada operación sensible debe verificar los permisos en el servidor.

Utiliza cookies seguras con atributos adecuados, como HttpOnly, Secure en producción y SameSite según el flujo.

---

## 11. SEGURIDAD DEVSECOPS

Implementa controles de seguridad durante todo el ciclo de desarrollo.

### 11.1. Código

- ESLint.
- TypeScript.
- Validación Zod.
- Revisión de dependencias.
- Gestión segura de errores.
- Protección contra XSS.
- Protección contra CSRF cuando corresponda.
- Consultas seguras.
- Autorización en backend.

### 11.2. Dependencias

Incorpora:

```bash
npm audit
```

Utiliza Dependabot para revisar actualizaciones.

No aceptes automáticamente cambios mayores sin verificar compatibilidad.

### 11.3. Detección de secretos

Incorpora Gitleaks.

Verifica que no se suban:

- Contraseñas.
- Tokens.
- Claves privadas.
- API keys.
- Credenciales de infraestructura.
- Archivos `.env` reales.

### 11.4. Análisis estático

Incorpora GitHub CodeQL.

Configura análisis para el lenguaje correspondiente.

### 11.5. Seguridad de contenedores

Utiliza Trivy para analizar imágenes Docker y dependencias.

### 11.6. Pruebas dinámicas

Integra OWASP ZAP en un entorno de pruebas, nunca contra sistemas ajenos o producción sin autorización.

### 11.7. Seguridad HTTP

Configura encabezados de seguridad apropiados:

- Content-Security-Policy.
- Strict-Transport-Security en HTTPS.
- X-Content-Type-Options.
- Referrer-Policy.
- Política de permisos del navegador.

Define CSP según los recursos realmente utilizados, evitando políticas inseguras como permitir scripts arbitrarios innecesariamente.

---

## 12. DOCKER

Construye una imagen de producción segura.

Requisitos:

- Dockerfile multi-stage.
- Imagen base oficial.
- Versiones controladas.
- Usuario no root.
- Dependencias de producción.
- Build reproducible.
- `.dockerignore`.
- Secretos fuera de la imagen.
- Healthcheck.
- Red interna.
- Logs.
- Reinicio controlado.
- Límites de recursos cuando correspondan.

Crea:

```text
Dockerfile
.dockerignore
compose.yaml
```

Separa los entornos de desarrollo y producción cuando sea necesario.

No expongas puertos de PostgreSQL ni servicios internos al exterior.

---

## 13. GITHUB

Inicializa Git si todavía no existe:

```bash
git init
git status
```

Revisa el `.gitignore` y los archivos que se van a incluir.

Crea un repositorio privado en GitHub.

Cuando exista la URL real:

```bash
git remote add origin URL_REAL_DEL_REPOSITORIO
git branch -M main
git push -u origin main
```

No inventes la URL ni publiques credenciales.

Configura:

- Rama principal protegida.
- Revisión de cambios.
- Protección contra pushes directos.
- Comprobaciones obligatorias.
- Dependabot.
- CodeQL.
- Secret scanning, según disponibilidad.

---

## 14. GITHUB ACTIONS — CI/CD

Construye workflows independientes y bien documentados.

### CI

Debe ejecutar:

1. Checkout del repositorio.
2. Configuración de Node.js.
3. Instalación mediante `npm ci`.
4. ESLint.
5. TypeScript.
6. Pruebas.
7. Auditoría de dependencias.
8. Compilación.
9. Detección de secretos.
10. Análisis de seguridad.

### Construcción Docker

Debe:

- Construir la imagen.
- Verificar el resultado.
- Ejecutar análisis Trivy.
- Publicar solo cuando esté autorizado.

### CD

Diseña un despliegue controlado a Hostinger.

Requisitos:

- Secretos protegidos.
- SSH mediante claves.
- Permisos mínimos.
- Entornos separados.
- Aprobación para producción.
- Healthcheck posterior al despliegue.
- Rollback documentado.

No realices un despliegue real hasta recibir autorización.

En los workflows aplica permisos mínimos mediante `permissions`, evita tokens con privilegios innecesarios y fija las acciones de terceros a versiones o SHA verificables.

---

## 15. HOSTINGER VPS

Prepara una guía para desplegar en el VPS.

El proceso debe contemplar:

1. Inspección del servidor.
2. Actualización del sistema.
3. Configuración de usuarios.
4. Configuración SSH.
5. Firewall.
6. Instalación de Docker.
7. Configuración del proxy inverso.
8. Certificados HTTPS.
9. Aplicación.
10. PostgreSQL.
11. Backups.
12. Logs y monitorización.
13. Actualizaciones.
14. Rollback.

El VPS no debe recibir configuraciones destructivas sin autorización.

El dominio `ceyaarquitectura.com` está en proceso de transferencia a Hostinger. No modifiques los registros DNS ni los registros de correo existentes sin verificar primero qué servicios utilizan.

---

## 16. OPENCLAW

Integra OpenClaw como infraestructura independiente para coordinar agentes.

No lo conviertas en una dependencia obligatoria para que la página web funcione.

Diseña una integración mediante un backend intermediario controlado.

Los agentes deben disponer de:

- Identidad propia.
- Permisos limitados.
- Herramientas autorizadas.
- Registro de actividad.
- Límites de ejecución.
- Protección de secretos.
- Separación entre desarrollo y producción.

No permitas que un agente público ejecute comandos arbitrarios.

Las operaciones críticas requerirán aprobación humana.

---

## 17. PRUEBAS Y CONTROL DE CALIDAD

Implementa pruebas progresivamente:

- Pruebas unitarias.
- Pruebas de integración.
- Pruebas de API.
- Pruebas de autenticación.
- Pruebas de autorización.
- Pruebas de formularios.
- Pruebas de seguridad.
- Pruebas end-to-end.
- Pruebas responsive.
- Pruebas de rendimiento.

Cada módulo debe tener criterios de aceptación.

No marques una fase como terminada si sus pruebas fallan.

---

## 18. DOCUMENTACIÓN

Mantén actualizados:

```text
README.md
AGENTS.md
SECURITY.md
docs/ARCHITECTURE.md
docs/DEPLOYMENT.md
docs/DEVELOPMENT.md
docs/SECURITY-CHECKLIST.md
docs/DATABASE.md
docs/CI-CD.md
```

Documenta:

- Arquitectura.
- Dependencias.
- Comandos.
- Variables de entorno.
- Instalación.
- Desarrollo local.
- Pruebas.
- Construcción.
- Despliegue.
- Seguridad.
- Recuperación ante fallos.

Nunca escribas secretos reales en la documentación.

---

## 19. FASES DE EJECUCIÓN

Debes trabajar en este orden:

### FASE 0 — Auditoría inicial

- Inspeccionar el equipo.
- Revisar directorio.
- Revisar herramientas.
- Detectar proyectos existentes.
- Revisar recursos de marca disponibles.
- Identificar riesgos.

**Resultado:** informe inicial sin modificar nada.

### FASE 1 — Inicialización

- Crear o reutilizar Next.js.
- Configurar TypeScript.
- Configurar ESLint.
- Configurar Tailwind.
- Ejecutar la aplicación.
- Verificar compilación.

**Resultado:** aplicación inicial funcionando.

### FASE 2 — Arquitectura y diseño

- Definir estructura.
- Diseñar identidad visual.
- Crear componentes compartidos.
- Implementar navegación.
- Diseñar páginas principales.

**Resultado:** primera interfaz funcional y responsive.

### FASE 3 — Backend y base de datos

- Configurar PostgreSQL.
- Definir modelo de datos.
- Implementar migraciones.
- Crear servicios.
- Implementar validación.

**Resultado:** backend funcional y persistencia segura.

### FASE 4 — Usuarios y administración

- Autenticación.
- Autorización.
- Roles.
- Panel administrativo.
- Gestión de contenido.

**Resultado:** administración protegida.

### FASE 5 — Funcionalidades públicas

- Servicios.
- Proyectos.
- Portafolio.
- Contacto.
- Galería.

**Resultado:** plataforma funcional.

### FASE 6 — Docker

- Dockerfile.
- Docker Compose.
- Redes.
- Healthchecks.
- Seguridad de contenedores.

**Resultado:** entorno reproducible.

### FASE 7 — DevSecOps

- Gitleaks.
- CodeQL.
- Dependabot.
- Trivy.
- Pruebas.
- Reglas de calidad.

**Resultado:** controles automatizados.

### FASE 8 — GitHub Actions

- CI.
- Construcción de imágenes.
- Validaciones.
- Preparación de CD.

**Resultado:** pipeline validado.

### FASE 9 — Hostinger

- Preparar VPS.
- Configurar seguridad.
- Configurar HTTPS.
- Preparar despliegue.
- Probar rollback.

**Resultado:** entorno de producción preparado.

### FASE 10 — OpenClaw

- Instalar o integrar.
- Aislar.
- Configurar agentes.
- Definir herramientas y permisos.
- Probar controles.

**Resultado:** infraestructura de agentes controlada.

### FASE 11 — Auditoría final

- Revisar código.
- Ejecutar pruebas.
- Escanear dependencias.
- Escanear contenedores.
- Revisar permisos.
- Verificar backups.
- Documentar resultados.

**Resultado:** informe de preparación para producción.

---

## 20. METODOLOGÍA DE EJECUCIÓN DEL AGENTE

No intentes completar todas las fases en una única operación.

Trabaja de esta forma:

1. Inspecciona el estado actual.
2. Presenta un resumen de lo encontrado.
3. Identifica la siguiente tarea concreta.
4. Implementa únicamente esa tarea y sus dependencias necesarias.
5. Ejecuta pruebas.
6. Ejecuta controles de seguridad.
7. Corrige los errores.
8. Documenta los cambios.
9. Presenta un informe.
10. Continúa con la siguiente fase cuando los criterios de aceptación estén cumplidos.

Puedes completar autónomamente las tareas locales, seguras y reversibles. Solicita aprobación cuando una acción implique producción, datos existentes, servicios externos o cambios sensibles.

---

## 21. PRIMERA TAREA: COMENZAR AHORA

Comienza exclusivamente con la FASE 0 y la preparación de la FASE 1.

Realiza lo siguiente:

1. Inspecciona Ubuntu y las versiones de las herramientas.
2. Comprueba Docker y Docker Compose.
3. Comprueba Node.js y npm.
4. Comprueba Git.
5. Inspecciona si existe `~/Proyectos/aplicativo-web-ceya-arquitectura`.
6. Si existe, revisa su contenido y estado Git.
7. Si no existe, prepara la creación de Next.js.
8. Verifica compatibilidad de las versiones.
9. Presenta la arquitectura inicial recomendada.
10. Identifica riesgos y dependencias.

No elimines archivos existentes.

No modifiques DNS.

No despliegues a producción.

No instales OpenClaw todavía.

No crees credenciales ficticias.

No continúes con fases posteriores sin haber validado las anteriores.

### INFORME QUE DEBES ENTREGAR

Al terminar la primera ejecución, presenta:

- Estado del entorno.
- Versiones detectadas.
- Estado de Docker.
- Estado de Git.
- Estado del directorio.
- Archivos encontrados.
- Problemas detectados.
- Recomendación de Node.js.
- Próximos comandos.
- Riesgos de seguridad.
- Resultado de las pruebas ejecutadas.

**Objetivo final:** construir una plataforma profesional para CEYA Arquitectura, con una arquitectura moderna, código mantenible, seguridad integrada, automatización DevSecOps y despliegue controlado en Hostinger.

La calidad, la seguridad y la estabilidad tienen prioridad sobre la velocidad de implementación.
