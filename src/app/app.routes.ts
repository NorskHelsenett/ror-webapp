import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'error',
    //loadChildren: () => import('./error/error.module').then((m) => m.ErrorModule),
    async loadChildren() {
      const m = await import('./error/error-routing');
      return m.routes;
    },
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./auth/callback/callback.component').then((m) => m.CallbackComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    async loadChildren() {
      const m = await import('./layout/layout.routing');
      return m.routes;
    },
  },
  { path: '**', redirectTo: 'error/404' },
];
