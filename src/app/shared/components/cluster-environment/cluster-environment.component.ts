import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-cluster-environment',
  templateUrl: './cluster-environment.component.html',
  styleUrls: ['./cluster-environment.component.scss'],
  imports: [TranslateModule, CommonModule, ChipModule, UpperCasePipe],
})
export class ClusterEnvironmentComponent {
  @Input()
  environmentTag: string;

  constructor() {}

  getStyle(): string {
    switch (this.environmentTag) {
      case 'dev': {
        return this.environmentTag;
      }
      case 'lab': {
        return this.environmentTag;
      }
      case 'test': {
        return this.environmentTag;
      }
      case 'staging': {
        return this.environmentTag;
      }
      case 'qa': {
        return this.environmentTag;
      }
      case 'mgmt': {
        return this.environmentTag;
      }
      case 'prod': {
        return this.environmentTag;
      }
      default: {
        return 'unknown';
      }
    }
  }
}
