import { Routes, RouterModule } from '@angular/router';
import * as ordersPages from './pages';

export const routes: Routes = [
  {
    path: '',
    component: ordersPages.OrderListComponent,
  },
  {
    path: ':uid',
    component: ordersPages.OrderDetailComponent,
  },
];

export const OrdersRoutingModule = RouterModule.forChild(routes);
