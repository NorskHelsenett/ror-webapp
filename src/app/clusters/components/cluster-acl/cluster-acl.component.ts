import { Component, inject, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-cluster-acl',
  templateUrl: './cluster-acl.component.html',
  styleUrls: ['./cluster-acl.component.scss'],
  standalone: true,
  imports: [TranslateModule, TableModule, LowerCasePipe],
})
export class ClusterACLComponent implements OnInit {
  private configService = inject(ConfigService);

  @Input() cluster: any | undefined;

  rows = this.configService.config.rows;
  rowsPerPage = this.configService.config.rowsPerPage;
  accessGroups: any[];

  ngOnInit(): void {
    this.accessGroups = this.cluster?.acl?.accessGroups?.map((x: any) => {
      return { groupName: x };
    });
  }
}
