import { Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AuthenticationService } from './pages/authentication/services/authentication.service';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  {
    path: 'authentication',
    providers: [AuthenticationService],
    loadComponent: () =>
      import('./pages/authentication/authentication.component').then(
        (m) => AuthenticationComponent
      ),
  },
];
