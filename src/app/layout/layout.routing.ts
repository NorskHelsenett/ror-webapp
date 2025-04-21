import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        async loadChildren() {
          const m = await import('../dashboard/dashboard.routing');
          return m.routes;
        },
      },
      {
        path: 'datacenters',
        async loadChildren() {
          const m = await import('../datacenters/datacenters.routing');
          return m.routes;
        },
      },
      {
        path: 'workspaces',
        async loadChildren() {
          const m = await import('../workspaces/workspaces.routing');
          return m.routes;
        },
      },
      {
        path: 'create/cluster',
        async loadChildren() {
          const m = await import('../create/create-cluster/create-cluster.routing');
          return m.routes;
        },
      },
      {
        path: 'metrics',
        async loadComponent() {
          const m = await import('../metrics/metrics.component');
          return m.MetricsComponent;
        },
      },
      {
        path: 'orders',
        async loadChildren() {
          const m = await import('../orders/orders.routing');
          return m.routes;
        },
      },
      {
        path: 'prices',
        async loadComponent() {
          const m = await import('../prices/prices.component');
          return m.PricesComponent;
        },
      },
      {
        path: 'resources',
        async loadChildren() {
          const m = await import('../resources/resources.routing');
          return m.routes;
        },
      },
      {
        path: 'resourcesv2',
        async loadComponent() {
          const m = await import('../resourcesv2/pages/resources/resources.component');
          return m.ResourcesComponent;
        },
      },
      {
        path: 'userprofile',
        async loadComponent() {
          const m = await import('../userprofile/userprofile.component');
          return m.UserprofileComponent;
        },
      },
      {
        path: 'about',
        async loadComponent() {
          const m = await import('../about/about.component');
          return m.AboutComponent;
        },
      },
      {
        path: 'admin',
        async loadChildren() {
          const m = await import('../admin/admin.routing');
          return m.routes;
        },
      },
      {
        path: 'releasenotes',
        async loadComponent() {
          const m = await import('../release-notes/release-notes.component');
          return m.ReleaseNotesComponent;
        },
      },
      {
        path: 'virtualmachines',
        loadChildren: () => import('../virtualmachines/virtualmachines.module').then((m) => m.VirtualmachinesModule),
      },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
