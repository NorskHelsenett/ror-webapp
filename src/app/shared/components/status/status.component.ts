import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  imports: [TranslateModule, CommonModule],
})
export class StatusComponent implements OnInit {
  @Input() updatedDate: Date | undefined;

  constructor() {}

  ngOnInit(): void {
    return;
  }

  diffMinutes(date: Date): number {
    const d2 = new Date();
    const d1 = new Date(date);
    const diffMs = +d2 - +d1;
    return Math.floor(diffMs / 1000 / 60);
  }
}
