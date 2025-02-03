import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Resource } from '@rork8s/ror-resources/models';

@Component({
  selector: 'app-virtualmachine-os',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './virtualmachine-os.component.html',
  styleUrl: './virtualmachine-os.component.scss',
})
export class VirtualmachineOsComponent {
  @Input() virtualmachine: Resource | undefined;
}
