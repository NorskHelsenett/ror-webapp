import { JsonPipe } from '@angular/common';
import { NodepoolService } from './../../services/nodepool.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cluster-nodepool-createorupdate-summary',
  standalone: true,
  imports: [TranslateModule, JsonPipe],
  templateUrl: './cluster-nodepool-createorupdate-summary.component.html',
  styleUrl: './cluster-nodepool-createorupdate-summary.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
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
