import { CurrencyPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { NodepoolService } from './../../services/nodepool.service';
import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-cluster-nodepool-createorupdate-summary',
  standalone: true,
  imports: [TranslateModule, JsonPipe, TitleCasePipe, SharedModule, CurrencyPipe],
  templateUrl: './cluster-nodepool-createorupdate-summary.component.html',
  styleUrl: './cluster-nodepool-createorupdate-summary.component.scss',
})
export class ClusterNodepoolCreateorupdateSummaryComponent implements OnInit, OnDestroy {
  private changeDetector = inject(ChangeDetectorRef);
  private nodepoolService = inject(NodepoolService);

  @Input() nodepoolForm: FormGroup | undefined;

  ngOnInit(): void {
    this.nodepoolForm = this.nodepoolService?.nodepoolForm;
  }

  ngOnDestroy(): void {}
}
