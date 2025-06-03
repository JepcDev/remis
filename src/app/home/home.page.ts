import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';

// Independientes
// import { Models } from '../models/models';
// import { InteractionService } from '../services/interaction.service';
import { FirestoreService } from '../firebase/firestore.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // imports: [IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  // private interactionService: InteractionService = inject(InteractionService);

  // Prueba con el servicio de firestore
  private firestoreService: FirestoreService = inject(FirestoreService);

  constructor() {
    this.test();
    this.testLectura();
  }

  // Añade un nuevo documento dentro de la coleccion "test"
  async test() {
    console.log('test()');
    // crear documento añade id y date a la coleccions
    await this.firestoreService.createDocument('test', { hola: 'nada' });
  }

  // Esta funcion lee los dos documentos en tiempo real
  testLectura() {
    // leemos en tiempo real la coleccion "test" para estar pendiente de los ultimos cambios
    this.firestoreService.getDocumentsChanges('test').subscribe(res => {
      console.log('testLectura ->', res);
    });
  }

  // creamos un loading con el mensaje cargando
  // async save() {
  //   const response = await this.interactionService.presentAlert(
  //     'Importante',
  //     'Seguro que deseas <strong>guardar</strong>',
  //     'Cancelar',
  //     'Si'
  //   );
  //   await this.interactionService.showLoading('cargando..');
  //   console.log('response ->', response);
  //   // cerrramos el loading
  //   setTimeout(() => {
  //     this.interactionService.dismissLoading();
  //     this.interactionService.showToast('Guardado con éxito');
  //   }, 2000);
  // }
}
