import { Component, inject, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-cluster-acl',
  templateUrl: './cluster-acl.component.html',
  styleUrls: ['./cluster-acl.component.scss'],
  standalone: false,
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
