import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

// Services
import { IoniconsService } from './services/ionicons.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  // Injectamos los servicios en el componente padre para poder utilizarlo en toda la aplicacion
  private ioniconsService: IoniconsService = inject(IoniconsService);
  constructor() {
    // Vamos a poder utilizar todos iconos de ionic dentro de la aplicacion
    this.ioniconsService.loadAllIcons();
  }
}
