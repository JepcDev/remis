nvm install 22.2.0
nvmvm use 22.2.0
npm install -g @ionic/cli
ionic start nombre-app
cd nombre-app
ionic serve

<!-- instalar la version segun la version que esta en package.json
npm install @capacitor/android@5.5.0
-->

npm install @capacitor/android
npm install @capacitor/ios
npm i @capacitor/android @capacitor/ios

<!--añadir la plataforma, crea una carpeta android,ios que puede ser abierto en android studio para crear el apk
https://capacitorjs.com/docs/basics/workflow
-->

npx cap add android
npm cap add ios

<!-- sincroniza nuestro proyecto con los proyectos, carpetas que acabamos de construir con los anteriores comandos, sincroniza las carpetas iosy android con la carpeta www y esa carpeta se crea despues de hacer construido(build) nuestro proyecto por primera vez-->
<!-- Este comando se sincroniza con ios y android pero se puede modicar para que solo se sincronize con android -->
<!-- antes de ejecutar este comando hay que hacer la primera contruccion de nuestro proyecto sino no se sincroizara con exito -->

ionic build --production --prod
npx cap sync android
npx cap sync

## Crear proyecto en github

Capacitor : Es un framework para crear aplicaciones moviles a partir de aplicaciones web de forma natica para ios, android, etc.
