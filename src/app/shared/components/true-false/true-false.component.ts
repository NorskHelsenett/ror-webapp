import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.scss'],
  imports: [TranslateModule, TagModule, TooltipModule],
})
export class TrueFalseComponent {
  @Input()
  trueOrFalse: boolean;

  @Input()
  labelTrue: string;

  @Input()
  labelFalse: string;
}
