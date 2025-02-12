import { Routes, RouterModule } from '@angular/router';
import { AppMarketComponent } from './pages/app-market/app-market.component';
import { AppMarketCreateComponent } from './pages/app-market-create/app-market-create.component';
import { AppMarketInstallComponent } from './pages/app-market-install/app-market-install.component';
import { AppMarketDeleteComponent } from './pages/app-market-delete/app-market-delete.component';
import { AppMarketConfigureComponent } from './pages/app-market-configure/app-market-configure.component';

const routes: Routes = [
  {
    path: '',
    component: AppMarketComponent,
  },
  {
    path: 'create',
    component: AppMarketCreateComponent,
  },
  {
    path: ':appId/install',
    component: AppMarketInstallComponent,
  },
  {
    path: ':appId/configure',
    component: AppMarketInstallComponent,
  },
  {
    path: ':appId/delete',
    component: AppMarketDeleteComponent,
  },
];

export const AppMarketRoutingModule = RouterModule.forChild(routes);
