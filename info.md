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

### Integracion del proyecto ionic con firebase

copiar el codfigo de la configuracion del SDK

```js
firebaseConfig : {
  apiKey: "AIzaSyBTGgXQEz6LUmWXAzQbJPVFh0lj8PP8DAY",

  authDomain: "remiseats.firebaseapp.com",

  projectId: "remiseats",

  storageBucket: "remiseats.firebasestorage.app",

  messagingSenderId: "698475174026",

  appId: "1:698475174026:web:f8ab4cf4ba86147dd5b573",

  measurementId: "G-V2QVZT2KNL",
},
```

Luego pegamos en enviroment.ts y environment.prod.ts ya que este archivo es el que se toma cuando hacemos ionic serve o ionic build --prod

ahora integramos la libreria de firebase dentro de angular "angularfire",
npm i @angular/fire
npm i @angular/fre@18

en main.ts configuramos firebase

```ts

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  ScreenTrackingService,
  getAnalytics,
  provideAnalytics,
  UserTrackingService,
} from '@angular/fire/analytics';
import { Capacitor } from '@capacitor/core';

    // Firebase
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebaseConfig);
      if (Capacitor.isNativePlatform()) {
        initializeFirestore(app, {
          localCache: persistentLocalCache(),
        });
        initializeAuth(app, {
          persistence: indexedDBLocalPersistence,
        });
      }
      return app;
    }),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
```

Color : #72B800 #03301D #86EE02
Letras: raleway, montserrat
copiamos dentro de global.scss el import de la familia de letras que elegimos en google fonts esto es para letras que consumen una api es decir solo funcionan con internet

<!-- @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'); -->

- En variables.scss ponemos lo siguiente
<!-- :root {
  --ion-font-family: "Raleway", sans-serif;
} -->

- Para utilizarlo de forma local sin importar y internet se debe descargar los tipos de letras y hacer los pagos siguientes
- Descargar la familia de letras y pegar en src/fonts descomprimir y solo mantener los tipos de letras
- en global.scss pegar escribir lo siguiente

  ```scss
  // Font family local
  @font-face {
    font-family: "Montserrat";
    src: url("assets/fonts/Montserrat/Montserrat-Regular.ttf");
    font-style: normal;
  }
  @font-face {
    font-family: "Montserrat";
    src: url("assets/fonts/Montserrat/Montserrat-Bold.ttf");
    font-style: normal;
    font-weight: bold;
  }
  @font-face {
    font-family: "Montserrat";
    src: url("assets/fonts/Montserrat/Montserrat-Italic.ttf");
    font-style: italic;
  }
  @font-face {
    font-family: "Montserrat";
    src: url("assets/fonts/Montserrat/Montserrat-ExtraBold.ttf");
    font-style: normal;
    font-weight: 800;
  }
  ```

  ### Organizar modelos y interfaces

  todos los modelos iran en la carpeta models -> auth.models, firestore.models,functions.models, models
  models contiente todos los modelos que estan en diferentes archivos, organiza todos los modelos bajo un mismo nombre,
  reuniremos interfaces y modelos en un archivo que los relacione, si diferentes interfaces estan relacionadas entre si las crearemos en un mismo archivo, caso contrario lo pondremos en archivos diferentes.

  ### Iconografia

  Trabajaremos con los iconos de ionic ionicons, podemos trabajar con estos iconos sin conexion. es decir los usuarios no tienen que estar conectados a internet para visualizar los iconos de la aplicacion. ya que los iconos se encuentran descargados dentro del proyecto ya que se descargaron los iconos con las dependencias del proyecto.
  Vamos a necesitar agregar un servicio ya que desde que se usa standalone tenemos que decir a angular o a ionic que iconos vamos a usar
  <!-- src\app\services\ionicons.service.ts -->

  Injectamos los servicios en el componente padre para poder utilizarlo en toda la aplicacion app.component.ts
  Tambien se lo puede injectar dentro del constructor
  <!--
   private ioniconsService: IoniconsService = inject(IoniconsService);
  constructor() {
    this.ioniconsService.loadAllIcons();
  }
  -->

### Interaction service

Solo creamos un nuevo servicio interaccion.service.ts para la interacion de los usuarios la app,
probamos el servicio con home.page.ts
muestra toast alerts y demas mensajes segun que argumentos le enviemos a la funcion
https://github.com/juanpablo-jpho/remis-app/tree/main

### Crear base de datos en firestore

Ingresamos a la consola del proyecto "Remis" y vamos a la seccion "firestore database", En el panel ingresamos a "crear base de datos"

- Creamos la base de datos con los datos por defaul en "united state 5" y con los datos en produccion no en pruebas.

### Integracion de firebase en el proyecto

https://github.com/angular/angularfire/blob/main/docs/firestore.md#cloud-firestore

- hacemos las integraciones en main y en environment de firestore lo mismo que hicimos en "Integracion del proyecto ionic con firebase"
- instalamos angular fire -> npm install @angular/fire
- creamos el directorio para los servicios de "firebase", creamos el archivo firestore.service.ts implementamos
- Hacemos las pruebas necesarias con home

```ts
@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  imports: [IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private interactionService: InteractionService = inject(InteractionService);

  // Prueba con el servicio de firestore
  private firestoreService: FirestoreService = inject(FirestoreService);

  constructor() {
    this.test();
    this.testLectura();
  }

  // Añade un nuevo documento dentro de la coleccion "test"
  async test() {
    console.log("test()");
    // crear documento añade id y date a la coleccions
    await this.firestoreService.createDocument("test", { hola: "nada" });
  }

  // Esta funcion lee los dos documentos en tiempo real
  testLectura() {
    // leemos en tiempo real la coleccion "test" para estar pendiente de los ultimos cambios
    this.firestoreService.getDocumentsChanges("test").subscribe((res) => {
      console.log("testLectura ->", res);
    });
  }

  // creamos un loading con el mensaje cargando
  async save() {
    const response = await this.interactionService.presentAlert("Importante", "Seguro que deseas <strong>guardar</strong>", "Cancelar", "Si");
    await this.interactionService.showLoading("cargando..");
    console.log("response ->", response);
    // cerrramos el loading
    setTimeout(() => {
      this.interactionService.dismissLoading();
      this.interactionService.showToast("Guardado con éxito");
    }, 2000);
  }
}
```

- En la consola de firebase añadimos nuevas reglas para firebase, para que el usuario solo pueda leer y escribir dentro de la coleccion test

```ts
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
  // permite agregar datos en el document "test", los usuario solo pueden leer y escribir dentro de esta coleccion test
    match /test/{id} {
      allow read, write: if true;
    }
  }
}
```

### Integracion con el modulo de storage de firebase

1. El storage es para guardar archivos multimedia, firestore database no guarda archivos grandes como el de multimedia.

- En la consola de firebase, creamos un nuevo "storage"
- Crear en el nivel sin costo, crear en la misma region que se creo el modulo de firestore

2. En main.ts inicializamos el proyecto con las credenciales de firebase,firestore, auth, storage.

```ts
// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  ScreenTrackingService,
  getAnalytics,
  provideAnalytics,
  UserTrackingService,
} from '@angular/fire/analytics';
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebaseConfig);
      // esta funcion es para que funcione dentro de aios
      if (Capacitor.isNativePlatform()) {
        initializeFirestore(app, {
          localCache: persistentLocalCache(),
        });
        initializeAuth(app, {
          persistence: indexedDBLocalPersistence,
        });
      }
      return app;
    }),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
```

3. Creamos un servicio (storage.service.ts) para poder usar y hacer peticiones a "storage" de firebase
  - Estamos ocupando un servicio para que todos los componentes dentro de nuestra aplicacion si desean subir algo dentro del "modulo de almacenamiento" "storage" puedan usar este servicio para iteracturar con el modulo del storage.
  - Si en un futuro la libreria del storage cambia nosotros no tendremos que cambiar toda la app o componentes de la app, solamente tendremos que cambiar el servicio, hacer ajustes y toda la app seguira funcionando muy bien.

4. Configuramos los cors
- Instalamos gsutil para iterar con google cloud storage
<!-- https://cloud.google.com/storage/docs/gsutil_install?hl=es-419#windows -->
<!-- gcloud auth login //nos logeamos en google cloud
<!-- gsutil cors set cors.json gs://pideenremis.appspot.com -->
- creamos cors.json