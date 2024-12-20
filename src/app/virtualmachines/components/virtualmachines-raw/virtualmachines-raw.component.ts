import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ResourceSet } from '@rork8s/ror-resources/models';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-virtualmachines-raw',
  standalone: true,
  imports: [TranslateModule, JsonPipe, HighlightModule],
  templateUrl: './virtualmachines-raw.component.html',
  styleUrl: './virtualmachines-raw.component.scss',
})
export class VirtualmachinesRawComponent {
  @Input() resource: ResourceSet;
}
