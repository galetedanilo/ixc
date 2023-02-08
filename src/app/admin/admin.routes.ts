import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardService } from './pages/dashboard/services/dashboard.service';
import { SettingService } from './pages/settings/services/setting.service';
import { UsersService } from './pages/users/services/users.service';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        providers: [DashboardService],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'users',
        providers: [UsersService],
        loadComponent: () =>
          import('./pages/users/users.component').then((c) => c.UsersComponent),
      },
      {
        path: 'settings',
        providers: [SettingService],
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (c) => c.SettingsComponent
          ),
      },
    ],
  },
];
