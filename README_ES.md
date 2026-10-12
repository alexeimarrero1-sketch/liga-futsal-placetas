# Liga de Futsal de Placetas — prototipo inicial

## Qué incluye
- Interfaz adaptable a teléfono.
- Pestañas Inicio, Partidos, Clasificación, Equipos y Admin.
- 11 equipos de referencia: FC CPA, Zaza FC, Esperanza del Norte, Minas FC, Cabaret, Picsina, La Plaza, Parquesito, Laureles, Nueva Generación y KC.
- Marcadores de demostración; tabla calculada automáticamente.
- Guarda los cambios de demostración en el almacenamiento local del navegador.
- Service worker y manifest para comenzar a probar como PWA.
- Esquema SQL inicial para una futura base de datos PostgreSQL.

## Advertencia importante
Este paquete NO es todavía un servicio público conectado a internet. El panel Admin es solo una demostración: no tiene autenticación y los resultados se guardan únicamente en el teléfono/navegador que los introduce. No publiques el panel así. Los marcadores iniciales son datos ficticios, no resultados oficiales. No incluye aún los escudos gráficos originales.

## Cómo probar desde Android
1. Descarga y descomprime el ZIP en un dispositivo o servicio que permita editar archivos.
2. Para ver la página sin instalar, abre `index.html` en un navegador o editor HTML local. Algunas funciones PWA no funcionarán si se abre como archivo local.
3. Para probar instalación PWA real, publica los archivos en un alojamiento HTTPS. El service worker requiere un origen seguro (HTTPS o localhost).
4. Abre la URL HTTPS en Chrome Android y usa el menú del navegador > “Instalar aplicación” o “Añadir a pantalla de inicio”, según aparezca.
5. Prueba abrirla, apagar internet y comprobar qué pantalla/datos se conservan.

## Cómo construir el APK
El APK requiere un entorno de compilación Android. La vía recomendada es usar un ordenador con Node.js, Android Studio y Android SDK, siguiendo la documentación oficial de Capacitor. Desde el teléfono solamente, se puede editar y preparar el proyecto, pero la compilación no está garantizada y suele ser mucho más difícil.
Pasos orientativos en un ordenador:
1. Instalar Node.js y Android Studio.
2. Crear un proyecto Vite y copiar los archivos web en la carpeta `public` o adaptar este prototipo al proyecto.
3. Instalar Capacitor y añadir Android.
4. Compilar y firmar el APK desde Android Studio.
Este ZIP por sí solo no es un APK y no debe presentarse como tal.

## Antes de lanzamiento público
- Elegir y probar el alojamiento desde varias conexiones en Cuba.
- Configurar base de datos y API.
- Añadir autenticación real y permisos de administrador.
- Añadir los escudos originales y revisar nombres oficiales.
- Definir reglas oficiales de puntuación, desempates y formato de competición.
- Configurar HTTPS, copias de seguridad, exportación y recuperación de datos.
- Probar PWA, sincronización y modo offline con datos reales.

## Archivos
- `index.html`: estructura de la interfaz.
- `styles.css`: estilos.
- `app.js`: navegación, tabla y almacenamiento de demostración.
- `manifest.webmanifest`: configuración PWA.
- `sw.js`: caché offline inicial.
- `database_schema.sql`: esquema PostgreSQL preliminar.
