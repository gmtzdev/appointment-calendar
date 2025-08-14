import { Routes } from '@angular/router';

/**
 * Authentication feature routes configuration for lazy loading
 * Handles login, password reset, and other auth-related pages
 */
export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
      .then(c => c.LoginComponent)
  }
  // TODO: Add more auth routes as needed
  // {
  //   path: 'forgot-password',
  //   loadComponent: () => import('./pages/forgot-password/forgot-password.component')
  //     .then(c => c.ForgotPasswordComponent)
  // },
  // {
  //   path: 'reset-password',
  //   loadComponent: () => import('./pages/reset-password/reset-password.component')
  //     .then(c => c.ResetPasswordComponent)
  // }
];
