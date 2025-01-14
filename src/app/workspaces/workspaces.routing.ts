import { Routes, RouterModule } from '@angular/router';
import { WorkspacesComponent } from './workspaces.component';

import * as workspacesPages from './pages';

const routes: Routes = [
  {
    path: '',
    component: WorkspacesComponent,
  },
  {
    path: ':workspaceId',
    component: workspacesPages.WorkspaceDetailsComponent,
  },
  {
    path: ':workspaceId/edit',
    component: workspacesPages.WorkspaceNewComponent,
  },
];

export const WorkspacesRoutingModule = RouterModule.forChild(routes);
