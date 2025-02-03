import { Resource } from '@rork8s/ror-resources/models';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PowerComponent } from '../../../shared/components/power/power.component';
import { PowerState } from '../../../core/models/powerstate';

@Component({
  selector: 'app-virtualmachine-status',
  standalone: true,
  imports: [TranslateModule, PowerComponent],
  templateUrl: './virtualmachine-status.component.html',
  styleUrl: './virtualmachine-status.component.scss',
})
export class VirtualmachineStatusComponent {
  @Input() virtualmachine: Resource | undefined;

  powerstates = PowerState;
}
