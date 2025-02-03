import { Resource } from '@rork8s/ror-resources/models';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-virtualmachine-specs',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './virtualmachine-specs.component.html',
  styleUrl: './virtualmachine-specs.component.scss',
})
export class VirtualmachineSpecsComponent {
  @Input() virtualmachine: Resource | undefined;
}
