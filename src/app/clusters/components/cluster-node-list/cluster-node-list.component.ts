import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ConfigService } from '../../../core/services/config.service';
import { LowerCasePipe } from '@angular/common';
import { FormatBytesPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-cluster-node-list',
  imports: [TranslateModule, TableModule, LowerCasePipe, FormatBytesPipe],
  templateUrl: './cluster-node-list.component.html',
  styleUrl: './cluster-node-list.component.scss',
})
export class ClusterNodeListComponent implements OnInit {
  @Input() nodes: any[] = [];

  rows = 10;
  rowsPerPage: number[] = [10, 20, 50];

  private configService = inject(ConfigService);

  ngOnInit(): void {
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;
  }
}
