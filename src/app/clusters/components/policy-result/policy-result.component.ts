import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-policy-result',
  templateUrl: './policy-result.component.html',
  styleUrls: ['./policy-result.component.scss'],
  imports: [TranslateModule, CommonModule],
})
export class PolicyResultComponent {
  @Input() result: string;
}
