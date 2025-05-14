configurar powershell para ejecutar scripts

    ir al cmd y digitar:
    powershell Set-ExecutionPolicy RemoteSigned

    posibles valores:

    Restricted - No Script either local, remote or downloaded can be executed on the system.
    AllSigned - All script that are ran require to be digitally signed.
    RemoteSigned - All remote scripts (UNC) or downloaded need to be signed.
    Unrestricted - No signature for any type of script is required

instalar node:
https://nodejs.org/en/download/package-manager

instalar nvm - node
https://github.com/nvm-sh/nvm
https://github.com/coreybutler/nvm-windows
https://github.com/coreybutler/nvm-windows/releases
nvm install 22.2.0 //instala node
nvmvm use 22.2.0

https://angular.dev/installation
npm install -g @angular/cli

instalar firebase-tools
https://firebase.google.com/docs/cli
npm install -g firebase-tools
firebase --version

https://ionicframework.com/
npm install -g @ionic/cli
ionic -v

<!-- Crea un proyecto con ionic la ultima version de las herramientas y tecnologias -->

ionic start nombre-app
cd nombre-app
ionic serve

<!-- instalar la version segun la version de capacitor que esta en package.json
npm install @capacitor/android@5.5.0
-->

npm install @capacitor/android
npm install @capacitor/ios
npm i @capacitor/android @capacitor/ios

<!--añadir la plataforma, crea una carpeta android,ios que puede ser abierto en android studio para crear el apk
https://capacitorjs.com/docs/basics/workflow
-->

npx cap add android
npx cap add ios

<!-- npx cap sync sincroniza nuestro proyecto con los proyectos, carpetas que acabamos de construir con los anteriores comandos, sincroniza las carpetas iosy android con la carpeta www y esa carpeta se crea despues de hacer construido(build) nuestro proyecto por primera vez-->
<!-- Este comando se sincroniza con ios y android pero se puede modicar para que solo se sincronize con android -->
<!-- antes de ejecutar este comando hay que hacer la primera contruccion de nuestro proyecto sino no se sincroizara con exito -->

ionic build --production --prod <!--hace la 1ra construccion de nuestro proyecto-->
npx cap sync android
npx cap sync <!--se sincronizan android y ios con la carpeta www-->

npx cap opne android <!-- Abre el proyecto en android studios-->

## Crear proyecto en github

Capacitor : Es un framework para crear aplicaciones moviles a partir de aplicaciones web de forma natica para ios, android, etc.

### Proyecto en firebase

En "consola" de firebase se crea los proyectos, ponemos un nombre y un id (nombre del dominio)unico a nivel mundial, activar google analitics
Establecer la region en la que estamos creando el proyecto, habilitamos todas las casillas y le damos crear.

en la rueda de "descripcion general" elegimos "configuracion de proyecto", en "Tus apps" creamos para la web </>, elegimos un nombre y habilitamos el check "ademas, configura firebase hosting para esta app", elegimos el proyecto que acabamos de crear "remiseats" registramos la app.

instalamos local y globalmente firebase
npm install firebase
npm install -g firebase-tools
firebase login //accedemos a google
firebase init //iniciamos el proyecto Ejecuta el siguiente comando en el directorio raíz de tu app:
firebase deploy //Cuando tengas todo listo, implementa tu app web Ubica los archivos estáticos (p. ej., HTML, CSS y JS) en el directorio de implementación de la app (el directorio predeterminado es "public"). Luego, ejecuta este comando desde el directorio raíz de tu app: Después de la implementación, consulta tu app en remiseats.web.app
