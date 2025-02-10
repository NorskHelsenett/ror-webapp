import { Routes, RouterModule } from '@angular/router';
import { AppStoreComponent } from './pages/app-store/app-store.component';

const routes: Routes = [
  {
    path: '',
    component: AppStoreComponent,
  },
  // {
  //   path: ':appId',
  //   component: ,
  // },
  // {
  //   path: ':appId/edit',
  //   component: ,
  // },
];

export const AppStoreRoutingModule = RouterModule.forChild(routes);
