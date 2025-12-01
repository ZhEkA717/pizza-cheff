import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@core/modules/landing/landing.routes').then(({routes}) => routes)
  }
];
