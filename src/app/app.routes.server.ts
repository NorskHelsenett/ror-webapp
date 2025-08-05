import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'error', renderMode: RenderMode.Prerender },
  { path: 'auth/callback', renderMode: RenderMode.Prerender },
  { path: 'auth/login', renderMode: RenderMode.Prerender },
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'cluster/:id', renderMode: RenderMode.Client },
  { path: 'cluster/:id/ingresses/:ingressid', renderMode: RenderMode.Client },
  { path: 'cluster/:id/ingress/:ingressid', renderMode: RenderMode.Client },
  { path: 'workspaces/:workspaceId', renderMode: RenderMode.Client },
  { path: 'workspaces/:workspaceId/edit', renderMode: RenderMode.Client },
  { path: 'orders/:uid', renderMode: RenderMode.Client },
  { path: 'resources/:apiVersion/:kind/:scope/:subject/:uid', renderMode: RenderMode.Client },
  { path: 'admin/acl/:id/edit', renderMode: RenderMode.Client },
  { path: 'admin/datacenter/:datacenterId/edit', renderMode: RenderMode.Client },
  { path: 'admin/prices/:id/edit', renderMode: RenderMode.Client },
  { path: 'admin/projects/:id/edit', renderMode: RenderMode.Client },
  { path: 'admin/datacenter/:datacenterName', renderMode: RenderMode.Client },
  { path: 'admin/configuration/operatorconfig/:id/edit', renderMode: RenderMode.Client },
  { path: 'admin/configuration/task/:id/edit', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];
