import { Routes } from '@angular/router';
import { authGuard } from './authGuard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cats',
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
  {
    path: 'cats',
    loadComponent: () => import('./pages/cats/cats/cats').then((m) => m.Cats),
    canActivate: [authGuard],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites/favorites').then(
        (m) => m.FavoritesComponent
      ),
    canActivate: [authGuard],
  },
];
