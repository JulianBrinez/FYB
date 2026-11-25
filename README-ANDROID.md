# FYB Android: instalación para usuarios

Esta guía está dirigida a quienes solo van a instalar y utilizar FYB en su celular. **No necesitan instalar Android Studio, Node.js, Maven ni compilar el proyecto.** El equipo de desarrollo genera y comparte un APK ya compilado.

## Lo que necesita cada usuario

- Un celular Android.
- El archivo APK de FYB compartido por el equipo.
- Acceso a la misma red Wi-Fi que el computador donde se ejecuta el backend FYB.

## Instalar la aplicación

1. Recibe el archivo APK del equipo de desarrollo.
2. Ábrelo desde el celular.
3. Si Android lo solicita, permite temporalmente la instalación desde esa fuente.
4. Pulsa **Instalar** y abre FYB.

## Configurar el servidor desde la aplicación

En el primer inicio, FYB abre la pantalla **Configurar servidor**.

1. En el computador que ejecutará el backend, abre PowerShell y ejecuta `ipconfig`.
2. Identifica la dirección IPv4 del adaptador Wi-Fi o Ethernet activo (por ejemplo, `192.168.1.105`).
3. En FYB escribe la dirección completa, incluido el puerto: `http://192.168.1.105:8080`.
4. Pulsa **Probar conexión y guardar**.
5. Cuando aparezca el mensaje de conexión correcta, vuelve al inicio de sesión.

La dirección se guarda en el almacenamiento local de la aplicación. No es necesario volver a escribirla cada vez que se abre FYB. Si la IP del computador cambia, entra en **Configurar servidor** desde la pantalla de inicio de sesión o desde el menú de la aplicación y actualízala.

## Requisitos de red

- El backend Spring Boot debe estar ejecutándose en el computador.
- El celular y el computador deben estar en la misma red local, o en redes que permitan comunicación entre dispositivos.
- El Firewall de Windows debe permitir conexiones entrantes al puerto TCP 8080.
- No utilices `localhost` ni `127.0.0.1` como dirección del servidor en el celular: esas direcciones apuntan al propio teléfono.

## Para el equipo que genera el APK

Los usuarios finales no necesitan estas herramientas. Solo una persona del equipo de desarrollo debe preparar la versión distribuible, con JDK 17, Node.js/npm y Android SDK.

Desde la raíz del repositorio:

```powershell
cd android-app
npm install
npx cap sync android
cd android
.\gradlew.bat assembleDebug
```

El APK de prueba se genera en:

```text
android-app/android/app/build/outputs/apk/debug/app-debug.apk
```

Comparte ese archivo APK con los usuarios. Cada usuario configura la dirección del backend desde la aplicación, sin recompilarla.

> Esta configuración está pensada para pruebas y demostraciones en una red local. Para utilizar FYB desde redes diferentes o por Internet, el backend debe desplegarse en un servidor accesible mediante una dirección estable y segura (HTTPS).
