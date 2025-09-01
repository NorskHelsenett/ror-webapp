import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // Lazy load the standalone DashboardComponent
    loadComponent: () => import('./dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'cluster/create',
    loadComponent: () => import('../clusters/pages/cluster-new/cluster-new.component').then((m) => m.ClusterNewComponent),
  },
  {
    path: 'cluster/:id',
    loadComponent: () => import('../clusters/pages/cluster-details/cluster-details.component').then((m) => m.ClusterDetailsComponent),
  },
  {
    path: 'cluster/:id/ingresses/:ingressid',
    // Lazy load standalone IngressDetailsComponent
    loadComponent: () => import('../clusters/pages/ingress-details/ingress-details.component').then((m) => m.IngressDetailsComponent),
  },
  {
    path: 'cluster/:id/ingress/:ingressid',
    loadComponent: () => import('../clusters/pages/ingress/ingress.component').then((m) => m.IngressComponent),
  },
  //{ path: '**', redirectTo: 'error/404' },
];

export const DashboardRoutingModule = RouterModule.forChild(routes);
