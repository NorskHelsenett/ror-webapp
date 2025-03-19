import { AdminDatacentersComponent } from './datacenters/admin-datacenters.component';
import { AdminPricesComponent } from './prices/admin-prices.component';
import { ProjectsComponent } from './projects/projects.component';
import { VulnerabilityReportsComponent } from './vulnerability-reports/vulnerability-reports.component';
import { adminVulnerabilityReportsPages } from './vulnerability-reports/pages';

export * from './datacenters/admin-datacenters.component';
export * from './prices/admin-prices.component';
export * from './auditlogs/admin-auditlogs.component';
export * from './projects/projects.component';
export * from './vulnerability-reports/vulnerability-reports.component';
export * from './vulnerability-reports/pages';

export const adminPages = [
  AdminDatacentersComponent,
  AdminPricesComponent,
  ProjectsComponent,
  VulnerabilityReportsComponent,
  ...adminVulnerabilityReportsPages,
];
