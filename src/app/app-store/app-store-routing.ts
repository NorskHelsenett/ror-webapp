import { Routes, RouterModule } from '@angular/router';
import { AppStoreComponent } from './pages/app-store/app-store.component';
import { AppStoreCreateComponent } from './pages/app-store-create/app-store-create.component';
import { AppStoreInstallComponent } from './pages/app-store-install/app-store-install.component';
import { AppStoreDeleteComponent } from './pages/app-store-delete/app-store-delete.component';
import { AppStoreConfigureComponent } from './pages/app-store-configure/app-store-configure.component';

const routes: Routes = [
  {
    path: '',
    component: AppStoreComponent,
  },
  {
    path: 'create',
    component: AppStoreCreateComponent,
  },
  {
    path: ':appId/install',
    component: AppStoreInstallComponent,
  },
  {
    path: ':appId/configure',
    component: AppStoreInstallComponent,
  },
  {
    path: ':appId/delete',
    component: AppStoreDeleteComponent,
  },
];

export const AppStoreRoutingModule = RouterModule.forChild(routes);
