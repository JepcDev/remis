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
import { Models } from '../models/models';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private interactionService: InteractionService = inject(InteractionService);

  constructor() {}

  // creamos un loading con el mensaje cargando
  async save() {
    const response = await this.interactionService.presentAlert(
      'Importante',
      'Seguro que deseas <strong>guardar</strong>',
      'Cancelar',
      'Si'
    );
    await this.interactionService.showLoading('cargando..');
    console.log('response ->', response);
    // cerrramos el loading
    setTimeout(() => {
      this.interactionService.dismissLoading();
      this.interactionService.showToast('Guardado con éxito');
    }, 2000);
  }
}
