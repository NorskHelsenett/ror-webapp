import { Routes, RouterModule } from '@angular/router';
import { AdminReadGuard } from '../core/guards/admin-read.guard';

import { AdminCreateGuard as AdminOwnerGuard } from '../core/guards/admin-create.guard';
import { PolicyReportsComponent } from './pages/policy-reports/policy-reports.component';
import { ComplianceReportsComponent } from './pages/compliance-reports/compliance-reports.component';
import { AdminDatacentersComponent } from './pages/datacenters/admin-datacenters.component';
import { AdminDatacenterCreateComponent } from './pages/datacenters/pages/admin-datacenter-create/admin-datacenter-create.component';
import { AdminPricesComponent } from './pages/prices/admin-prices.component';
import { AdminPricesCreateComponent } from './pages/prices/pages/admin-prices-create/admin-prices-create.component';
import { AdminAuditlogsComponent } from './pages/auditlogs/admin-auditlogs.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsCreateComponent } from './pages/projects/pages/projects-create/projects-create.component';
import { ProjectDetailsComponent } from './pages/projects/pages/project-details/project-details.component';
import { AclComponent } from '../acl/pages/acl/acl.component';
import { AclCreateUpdatePageComponent } from '../acl/pages/acl-create-update/acl-create-update.component';
import { ApikeysComponent } from '../apikey/pages/apikeys/apikeys.component';
import { DatacenterDetailComponent } from '../datacenters/pages/datacenter-detail/datacenter-detail.component';
import { ConfigurationComponent } from '../configuration/pages/configuration/configuration.component';
import { ConfigOperatorconfigCreateUpdateComponent } from '../configuration/pages/config-operatorconfig-create-update/config-operatorconfig-create-update.component';
import { ConfigTaskCreateUpdateComponent } from '../configuration/pages/config-task-create-update/config-task-create-update.component';
import { ConfigDesiredversionCreateUpdateComponent } from '../configuration/pages/config-desiredversion-create-update/config-desiredversion-create-update.component';
import { VulnerabilityReportsComponent } from './pages/vulnerability-reports/vulnerability-reports.component';

export const routes: Routes = [
  {
    path: 'acl',
    canActivate: [AdminOwnerGuard],
    component: AclComponent,
  },
  {
    path: 'acl/create',
    canActivate: [AdminOwnerGuard],
    component: AclCreateUpdatePageComponent,
  },
  {
    path: 'acl/:id/edit',
    canActivate: [AdminOwnerGuard],
    component: AclCreateUpdatePageComponent,
  },
  {
    path: 'apikeys',
    canActivate: [AdminOwnerGuard],
    component: ApikeysComponent,
  },
  {
    path: 'apikeys',
    canActivate: [AdminOwnerGuard],
    component: ApikeysComponent,
  },
  {
    path: 'datacenter',
    component: AdminDatacentersComponent,
  },
  {
    path: 'datacenter/create',
    canActivate: [AdminReadGuard],
    component: AdminDatacenterCreateComponent,
  },
  {
    path: 'datacenter/:datacenterId/edit',
    canActivate: [AdminReadGuard],
    component: AdminDatacenterCreateComponent,
  },
  {
    path: 'prices',
    canActivate: [AdminReadGuard],
    component: AdminPricesComponent,
  },
  {
    path: 'prices/create',
    canActivate: [AdminReadGuard],
    component: AdminPricesCreateComponent,
  },
  {
    path: 'prices/:id/edit',
    canActivate: [AdminReadGuard],
    component: AdminPricesCreateComponent,
  },
  {
    path: 'auditlogs',
    canActivate: [AdminOwnerGuard],
    component: AdminAuditlogsComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'projects/create',
    canActivate: [AdminReadGuard],
    component: ProjectsCreateComponent,
  },
  {
    path: 'projects/:id/edit',
    canActivate: [AdminReadGuard],
    component: ProjectsCreateComponent,
  },
  {
    path: 'projects/:id',
    component: ProjectDetailsComponent,
  },
  {
    path: 'datacenter/:datacenterName',
    component: DatacenterDetailComponent,
  },
  {
    path: 'configuration',
    canActivate: [AdminOwnerGuard],
    component: ConfigurationComponent,
  },
  {
    path: 'configuration/operatorconfig/create',
    canActivate: [AdminOwnerGuard],
    component: ConfigOperatorconfigCreateUpdateComponent,
  },
  {
    path: 'configuration/operatorconfig/:id/edit',
    canActivate: [AdminOwnerGuard],
    component: ConfigOperatorconfigCreateUpdateComponent,
  },
  {
    path: 'configuration/task/create',
    canActivate: [AdminOwnerGuard],
    component: ConfigTaskCreateUpdateComponent,
  },
  {
    path: 'configuration/task/:id/edit',
    canActivate: [AdminOwnerGuard],
    component: ConfigTaskCreateUpdateComponent,
  },
  {
    path: 'configuration/desiredversion/create',
    canActivate: [AdminOwnerGuard],
    component: ConfigDesiredversionCreateUpdateComponent,
  },
  {
    path: 'configuration/desiredversion/edit',
    canActivate: [AdminOwnerGuard],
    component: ConfigDesiredversionCreateUpdateComponent,
  },
  {
    path: 'policyreports',
    canActivate: [AdminReadGuard],
    component: PolicyReportsComponent,
  },
  {
    path: 'vulnerabilityreports',
    canActivate: [AdminReadGuard],
    component: VulnerabilityReportsComponent,
  },
  {
    path: 'compliancereports',
    canActivate: [AdminReadGuard],
    component: ComplianceReportsComponent,
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
