# Guía de instalación y compilación Android - FYB

Esta guía explica cómo preparar la aplicación Android desde un clon limpio del repositorio. La aplicación móvil utiliza Capacitor para empaquetar los recursos de `android-app/www/` y se comunica con un backend Spring Boot que debe ejecutarse en un computador.

## 1. Requisitos

Instala y verifica:

- JDK 17.
- Node.js y npm.
- Android Studio con Android SDK y herramientas de compilación.
- Un celular Android o un emulador.
- Maven para ejecutar el backend desde la raíz del repositorio.

Comprueba las herramientas desde PowerShell:

```powershell
java -version
node -v
npm -v
mvn -version
```

## 2. Clonar el proyecto

```powershell
git clone https://github.com/jgomez675/FYB.git
cd FYB
```

Si estás trabajando desde un fork, utiliza la URL de tu fork.

## 3. Obtener la IP del computador

El celular y el computador que ejecuta el backend deben estar conectados a la misma red Wi-Fi (o a redes que permitan comunicación entre dispositivos).

En PowerShell ejecuta:

```powershell
ipconfig
```

Busca la dirección IPv4 del adaptador de red que estás utilizando. Por ejemplo, `192.168.1.105`. No copies la dirección de puerta de enlace ni la de un adaptador virtual.

## 4. Configurar la dirección del backend en Android

Abre:

```text
android-app/www/servicios/ApiClient.js
```

Busca la constante:

```javascript
const API_BASE = esAndroid ? "http://192.168.1.103:8080" : "";
```

Reemplaza `192.168.1.103` por la IPv4 de tu computador. Ejemplo:

```javascript
const API_BASE = esAndroid ? "http://192.168.1.105:8080" : "";
```

Conserva `:8080` si el backend está usando el puerto predeterminado. Si cambiaste el puerto mediante la variable `PORT`, actualiza también ese valor.

**Importante:** esta configuración corresponde al cliente web incluido en Android. El archivo de la interfaz web del backend (`src/main/resources/static/servicios/ApiClient.js`) es independiente. Para esta compilación, modifica el archivo ubicado dentro de `android-app/www/`.

## 5. Instalar dependencias y sincronizar Capacitor

Desde la carpeta `android-app`:

```powershell
cd android-app
npm install
npx cap sync android
```

El comando de sincronización copia los recursos de `www/` al proyecto Android y actualiza la integración nativa de Capacitor.

## 6. Iniciar el backend

Abre otra ventana de PowerShell, vuelve a la carpeta raíz del repositorio y ejecuta:

```powershell
mvn spring-boot:run
```

Comprueba en el mismo computador que el servidor responde:

```powershell
Invoke-WebRequest http://localhost:8080 -UseBasicParsing
```

El celular no debe utilizar `localhost` para conectarse al computador: debe utilizar la IPv4 del computador configurada en el paso 4.

Si el teléfono no logra conectarse, revisa que ambos dispositivos estén en la misma red, que Spring Boot siga ejecutándose y que el Firewall de Windows permita conexiones entrantes al puerto TCP 8080. Algunas redes Wi-Fi de invitados bloquean la comunicación entre dispositivos.

## 7. Generar el APK de prueba

Desde PowerShell, entra a la carpeta Android:

```powershell
cd android
.\gradlew.bat assembleDebug
```

El APK de depuración se genera normalmente en:

```text
android-app/android/app/build/outputs/apk/debug/app-debug.apk
```

Instálalo en el dispositivo Android. También puedes copiar el APK al celular y abrirlo para instalarlo, permitiendo la instalación desde esa fuente cuando Android lo solicite.

## 8. Probar la aplicación

1. Mantén Spring Boot ejecutándose en el computador.
2. Conecta el celular a la red que puede alcanzar ese computador.
3. Abre FYB en el celular.
4. Prueba el inicio de sesión y las funciones que consultan el backend.

Cada integrante debe compilar su propio APK después de configurar la IP de su computador. Un APK compilado con la IP de otra persona intentará conectarse a esa dirección.

## 9. Solución de problemas

| Problema | Qué revisar |
|---|---|
| No se pudo conectar con el servidor | IP configurada, backend iniciado y conectividad entre celular y computador. |
| Funciona en el computador, pero no en el celular | No uses `localhost` en Android; usa la IPv4 del computador. |
| La IP cambió | Actualiza `API_BASE`, sincroniza y vuelve a compilar el APK. |
| El celular no alcanza el puerto 8080 | Firewall de Windows, red Wi-Fi y aislamiento de clientes del router. |
| No se encuentra `gradlew.bat` | Verifica que estés dentro de `android-app/android`. |
| Cambios web no aparecen en el APK | Verifica `android-app/www/` y ejecuta `npx cap sync android` antes de compilar. |

## Nota sobre la conexión

La aplicación Android requiere que el backend esté disponible en la red local mientras se utiliza. Esta configuración está pensada para pruebas y demostraciones en una misma red; no constituye un despliegue público de producción.
