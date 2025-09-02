import { Routes, RouterModule } from '@angular/router';
import { AdminReadGuard } from '../core/guards/admin-read.guard';

import { AdminCreateGuard as AdminOwnerGuard } from '../core/guards/admin-create.guard';

export const routes: Routes = [
  {
    path: 'acl',
    canActivate: [AdminOwnerGuard],
    loadComponent: () => import('../acl/pages/acl/acl.component').then((m) => m.AclComponent),
  },
  {
    path: 'acl/create',
    canActivate: [AdminOwnerGuard],
    loadComponent: () => import('../acl/pages/acl-create-update/acl-create-update.component').then((m) => m.AclCreateUpdatePageComponent),
  },
  {
    path: 'acl/:id/edit',
    canActivate: [AdminOwnerGuard],
    loadComponent: () => import('../acl/pages/acl-create-update/acl-create-update.component').then((m) => m.AclCreateUpdatePageComponent),
  },
  {
    path: 'apikeys',
    canActivate: [AdminOwnerGuard],
    loadComponent: () => import('../apikey/pages/apikeys/apikeys.component').then((m) => m.ApikeysComponent),
  },
  {
    path: 'apikeys',
    canActivate: [AdminOwnerGuard],
    loadComponent: () => import('../apikey/pages/apikeys/apikeys.component').then((m) => m.ApikeysComponent),
  },
  {
    path: 'datacenter',
    loadComponent: () => import('./pages/datacenters/admin-datacenters.component').then((m) => m.AdminDatacentersComponent),
  },
  {
    path: 'datacenter/create',
    canActivate: [AdminReadGuard],
    loadComponent: () =>
      import('./pages/datacenters/pages/admin-datacenter-create/admin-datacenter-create.component').then((m) => m.AdminDatacenterCreateComponent),
  },
  {
    path: 'datacenter/:datacenterId/edit',
    canActivate: [AdminReadGuard],
    loadComponent: () =>
      import('./pages/datacenters/pages/admin-datacenter-create/admin-datacenter-create.component').then((m) => m.AdminDatacenterCreateComponent),
  },
  {
    path: 'prices',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/prices/admin-prices.component').then((m) => m.AdminPricesComponent),
  },
  {
    path: 'prices/create',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/prices/pages/admin-prices-create/admin-prices-create.component').then((m) => m.AdminPricesCreateComponent),
  },
  {
    path: 'prices/:id/edit',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/prices/pages/admin-prices-create/admin-prices-create.component').then((m) => m.AdminPricesCreateComponent),
  },
  {
    path: 'auditlogs',
    canActivate: [AdminOwnerGuard],
    loadComponent: () => import('./pages/auditlogs/admin-auditlogs.component').then((m) => m.AdminAuditlogsComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'projects/create',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/projects/pages/projects-create/projects-create.component').then((m) => m.ProjectsCreateComponent),
  },
  {
    path: 'projects/:id/edit',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/projects/pages/projects-create/projects-create.component').then((m) => m.ProjectsCreateComponent),
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/projects/pages/project-details/project-details.component').then((m) => m.ProjectDetailsComponent),
  },
  {
    path: 'datacenter/:datacenterName',
    loadComponent: () => import('./pages/datacenters/admin-datacenters.component').then((m) => m.AdminDatacentersComponent),
  },
  {
    path: 'configuration',
    canActivate: [AdminOwnerGuard],
    loadComponent: () => import('../configuration/pages/configuration/configuration.component').then((m) => m.ConfigurationComponent),
  },
  {
    path: 'configuration/operatorconfig/create',
    canActivate: [AdminOwnerGuard],
    loadComponent: () =>
      import('../configuration/pages/config-operatorconfig-create-update/config-operatorconfig-create-update.component').then(
        (m) => m.ConfigOperatorconfigCreateUpdateComponent,
      ),
  },
  {
    path: 'configuration/operatorconfig/:id/edit',
    canActivate: [AdminOwnerGuard],
    loadComponent: () =>
      import('../configuration/pages/config-operatorconfig-create-update/config-operatorconfig-create-update.component').then(
        (m) => m.ConfigOperatorconfigCreateUpdateComponent,
      ),
  },
  {
    path: 'configuration/task/create',
    canActivate: [AdminOwnerGuard],
    loadComponent: () =>
      import('../configuration/pages/config-task-create-update/config-task-create-update.component').then((m) => m.ConfigTaskCreateUpdateComponent),
  },
  {
    path: 'configuration/task/:id/edit',
    canActivate: [AdminOwnerGuard],
    loadComponent: () =>
      import('../configuration/pages/config-task-create-update/config-task-create-update.component').then((m) => m.ConfigTaskCreateUpdateComponent),
  },
  {
    path: 'configuration/desiredversion/create',
    canActivate: [AdminOwnerGuard],
    loadComponent: () =>
      import('../configuration/pages/config-desiredversion-create-update/config-desiredversion-create-update.component').then(
        (m) => m.ConfigDesiredversionCreateUpdateComponent,
      ),
  },
  {
    path: 'configuration/desiredversion/edit',
    canActivate: [AdminOwnerGuard],
    loadComponent: () =>
      import('../configuration/pages/config-desiredversion-create-update/config-desiredversion-create-update.component').then(
        (m) => m.ConfigDesiredversionCreateUpdateComponent,
      ),
  },
  {
    path: 'policyreports',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/policy-reports/policy-reports.component').then((m) => m.PolicyReportsComponent),
  },
  {
    path: 'vulnerabilityreports',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/vulnerability-reports/vulnerability-reports.component').then((m) => m.VulnerabilityReportsComponent),
  },
  {
    path: 'compliancereports',
    canActivate: [AdminReadGuard],
    loadComponent: () => import('./pages/compliance-reports/compliance-reports.component').then((m) => m.ComplianceReportsComponent),
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
