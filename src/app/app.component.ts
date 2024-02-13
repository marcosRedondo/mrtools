import { Component } from '@angular/core';

// NG_PRIME
import { MenuItem } from 'primeng/api';

//Package.json
import * as packageJson from '@packageJson'; // Asegúrate de ajustar la ruta correcta según la estructura de tu proyecto

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public version: string = packageJson?.version || '';
  public tabs: MenuItem[] = [
    {
      label: 'Languajes',
      icon: 'pi pi-fw pi-language',
      routerLink: 'languages',
    },
    {
      label: 'About: ' + this.version,
      icon: 'pi pi-fw pi-info-circle',
      routerLink: 'about',
    },
  ];
}
