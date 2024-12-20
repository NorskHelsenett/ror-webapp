import { VirtualmachineDetailsComponent } from './pages/virtualmachine-details/virtualmachine-details.component';
import { VirtualmachinesComponent } from './pages/virtualmachines/virtualmachines.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VirtualmachinesComponent,
  },
  {
    path: ':id',
    component: VirtualmachineDetailsComponent,
  },
];

export const VirtualMachinesRoutingModule = RouterModule.forChild(routes);
