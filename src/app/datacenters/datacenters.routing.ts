import { DatacentersComponent } from './datacenters.component';
import { Routes, RouterModule } from '@angular/router';
import * as datacentersPages from './pages';

export const routes: Routes = [
  {
    path: '',
    component: DatacentersComponent,
  },
  {
    path: ':datacenterId',
    component: datacentersPages.DatacenterDetailComponent,
  },
];

export const DatacentersRoutingModule = RouterModule.forChild(routes);
