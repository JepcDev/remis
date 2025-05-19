import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import * as all from 'ionicons/icons';

import { home, logoIonic, balloon } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class IoniconsService {
  constructor() {}

  // Agregamos solo los iconos que necesitamos
  loadListIcons() {
    addIcons({ home, logoIonic, balloon });
  }

  // Utilizamos todos los iconos
  loadAllIcons() {
    addIcons(all);
  }
}
