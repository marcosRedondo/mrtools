import { Component } from '@angular/core';

// NG_PRIME
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public version = '1.0.1';
  public tabs: MenuItem[] = [
    {
      label: 'Languajes',
      icon: 'pi pi-fw pi-language',
      routerLink: 'languages',
    },
    {
      label: 'About: ' + this.version,
      icon: 'pi pi-fw pi-info-circle',
      disabled: true,
      routerLink: 'about',
    },
  ];
}
