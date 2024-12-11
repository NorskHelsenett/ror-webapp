import { VirtualmachinesComponent } from './virtualmachines.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VirtualmachinesComponent,
  },
];

export const VirtualMachinesRoutingModule = RouterModule.forChild(routes);
