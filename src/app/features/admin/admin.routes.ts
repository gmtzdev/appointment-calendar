import { Routes } from '@angular/router';

/**
 * Admin feature routes configuration for lazy loading with standalone components
 * Defines all routes within the admin section using dynamic imports
 */
export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/admin-layout/admin-layout.component').then(c => c.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent) }
      // TODO: Add more routes as components are created
      // {
      //   path: 'users',
      //   loadComponent: () => import('./pages/users/users-list/users-list.component')
      //     .then(c => c.UsersListComponent)
      // },
      // {
      //   path: 'patients',
      //   loadComponent: () => import('./pages/patients/patients-list/patients-list.component')
      //     .then(c => c.PatientsListComponent)
      // },
      // {
      //   path: 'appointments',
      //   loadComponent: () => import('./pages/appointments/appointments-list/appointments-list.component')
      //     .then(c => c.AppointmentsListComponent)
      // },
      // {
      //   path: 'settings',
      //   loadComponent: () => import('./pages/settings/settings.component')
      //     .then(c => c.SettingsComponent)
      // }
    ]
  }
];
