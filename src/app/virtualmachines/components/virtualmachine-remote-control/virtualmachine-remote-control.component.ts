import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Resource } from '@rork8s/ror-resources/models';

@Component({
  selector: 'app-virtualmachine-remote-control',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './virtualmachine-remote-control.component.html',
  styleUrl: './virtualmachine-remote-control.component.scss',
})
export class VirtualmachineRemoteControlComponent {
  @Input() virtualmachine: Resource | undefined;
}
