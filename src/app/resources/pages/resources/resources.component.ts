import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceTableComponent } from '../../components/resource-table/resource-table.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resources',
  imports: [TranslatePipe, ResourceTableComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesComponent {}
