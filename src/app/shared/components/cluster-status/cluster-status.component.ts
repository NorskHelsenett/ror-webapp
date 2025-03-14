import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cluster-status',
  templateUrl: './cluster-status.component.html',
  styleUrls: ['./cluster-status.component.scss'],
  standalone: false,
})
export class ClusterStatusComponent implements OnInit {
  @Input() status: number = 0;

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
