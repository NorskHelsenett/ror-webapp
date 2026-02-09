import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '@angular/common';
import { TimePipe } from '../../../shared/pipes/time.pipe';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  imports: [TranslateModule, TitleCasePipe, TimePipe],
})
export class PriceListComponent implements OnInit {
  @Input() prices: any[];

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
