import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register/register').then((m) => m.Register),
  },
  {
    path: 'activate-account',
    loadComponent: () =>
      import('./pages/activate-account/activat-account/activat-account').then(
        (m) => m.ActivatAccount
      ),
  },
];
