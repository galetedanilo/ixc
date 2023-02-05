import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    title: 'Logar',
    loadChildren: () =>
      import('./auth/auth.routes').then((route) => route.AUTH_ROUTES),
  },
  {
    path: 'admin',
    title: 'Adminstration',
    loadChildren: () =>
      import('./admin/admin.routes').then((route) => route.ADMIN_ROUTES),
  },
];
