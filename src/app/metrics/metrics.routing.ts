import { MetricsComponent } from './metrics.component';

import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MetricsComponent,
  },
];

export const MetricsRoutingModule = RouterModule.forChild(routes);
