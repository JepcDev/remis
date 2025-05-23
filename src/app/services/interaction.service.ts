import { Injectable } from '@angular/core';
import {
  AlertController,
  IonicSafeString,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private loading: HTMLIonLoadingElement;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertController: AlertController
  ) {}

  // muestra que estamos "cargando" al usuario
  async showLoading(message: string = 'Cargando...') {
    this.loading = await this.loadingCtrl.create({
      message,
      backdropDismiss: true,
    });
    await this.loading.present();
  }

  // Cierra el loading que abrimos previamente, lo cerramos cuando hayamos completado un proceso, o cargado algo en la base de datos
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
    this.loading = null;
  }

  // muy bien o se hizo con exito, toas notificacion para los usuarios y el resultado de una de sus acciones del usuario dentro de la app
  async showToast(
    message: string,
    duration: number = 2000,
    position: 'bottom' | 'top' | 'middle' = 'bottom'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      color: 'dark',
    });
    await toast.present();
  }

  // Al final le mostramos al usuario una pregunta o una advertensia, con 2 botones, dependiendo el argumento que enviemos a la funcion se mostrara 1 o 2 botones
  // mostramos un boton cuando queremos informarle algo al usuario  "te enviamos un correo electronico revisalo //ok"
  // 2 botones cuando queremos hacer una pregunta "seguro que quieres eliminar tu cuenta //no o si"
  async presentAlert(
    header: string,
    message: string,
    textCANCEL: string = null,
    textOK: string = 'OK'
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      let buttons = [];
      if (textCANCEL) {
        buttons.push({
          text: textCANCEL,
          role: 'cancel',
          handler: () => {
            resolve(false);
          },
        });
      }
      buttons.push({
        text: textOK,
        handler: async () => {
          resolve(true);
        },
      });
      const alert = await this.alertController.create({
        header,
        message: new IonicSafeString(message).value,
        // message,
        buttons,
        backdropDismiss: false,
      });
      await alert.present();
    });
  }
}
