import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [CommonModule, TranslateModule],
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent {
  @Input() providerTypeOrName: string = '';
  @Input() iconSize: string = '';
  @Input() showText: boolean = true;
  @Input() showIcon: boolean = true;
}
