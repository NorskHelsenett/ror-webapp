import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Resource } from '@rork8s/ror-resources/models';

@Component({
  selector: 'app-virtualmachine-tools',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './virtualmachine-tools.component.html',
  styleUrl: './virtualmachine-tools.component.scss',
})
export class VirtualmachineToolsComponent {
  @Input() virtualmachine: Resource | undefined;
}
