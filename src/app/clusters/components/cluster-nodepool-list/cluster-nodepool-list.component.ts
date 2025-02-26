import { JsonPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ConfigService } from './../../../core/services/config.service';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ClusterNodeListComponent } from '../cluster-node-list/cluster-node-list.component';

@Component({
  selector: 'app-cluster-nodepool-list',
  standalone: true,
  imports: [TranslateModule, TableModule, LowerCasePipe, SharedModule, JsonPipe, TitleCasePipe, ButtonModule, ClusterNodeListComponent],
  templateUrl: './cluster-nodepool-list.component.html',
  styleUrl: './cluster-nodepool-list.component.scss',
})
export class ClusterNodepoolListComponent implements OnInit, OnDestroy {
  @Input() nodepools: any[] = [];
  rows = 10;
  rowsPerPage: number[] = [10, 20, 50];

  private configService = inject(ConfigService);

  constructor() {}

  ngOnInit(): void {
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;
  }

  ngOnDestroy(): void {}
}
