import { AsyncPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ConfigService } from './../../../core/services/config.service';
import { Component, inject, Input, OnDestroy, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AclService } from '../../../core/services/acl.service';
import { AclAccess, AclScopes } from '../../../core/models/acl-scopes';
import { catchError, Observable, share } from 'rxjs';
import { TrueFalseComponent } from '../../../shared/components/true-false/true-false.component';
import { FormatBytesPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-cluster-nodepool-list',
  imports: [TranslateModule, TableModule, LowerCasePipe, TitleCasePipe, ButtonModule, AsyncPipe, TrueFalseComponent, FormatBytesPipe],
  templateUrl: './cluster-nodepool-list.component.html',
  styleUrl: './cluster-nodepool-list.component.scss',
})
export class ClusterNodepoolListComponent implements OnInit, OnDestroy {
  @Input() nodepools: any[] = [];
  @Input() editable: boolean = false;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  showNodepoolEditor: boolean = false;
  rows = 10;
  rowsPerPage: number[] = [10, 20, 50];

  aclFetchError: any;
  adminOwner$: Observable<boolean> | undefined;

  private configService = inject(ConfigService);

  private aclService = inject(AclService);
  private changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;

    this.adminOwner$ = this.aclService.check(AclScopes.ROR, AclScopes.Global, AclAccess.Owner).pipe(
      share(),
      catchError((error: any) => {
        this.aclFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
  }

  ngOnDestroy(): void {}

  editNodepool(nodePool?: any): void {
    this.onEdit.emit(nodePool);
  }

  deleteNodepool(nodePool?: any): void {
    this.onDelete.emit(nodePool);
  }
}
