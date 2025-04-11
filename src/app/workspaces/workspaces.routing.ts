import { Routes, RouterModule } from '@angular/router';
import { WorkspacesComponent } from './workspaces.component';
import { WorkspaceDetailsComponent } from './pages/workspace-details/workspace-details.component';
import { WorkspaceNewComponent } from './pages/workspace-new/workspace-new.component';

export const routes: Routes = [
  {
    path: '',
    component: WorkspacesComponent,
  },
  {
    path: ':workspaceId',
    component: WorkspaceDetailsComponent,
  },
  {
    path: ':workspaceId/edit',
    component: WorkspaceNewComponent,
  },
];
