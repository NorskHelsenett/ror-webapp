import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-app-market-grid-filter',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './app-market-grid-filter.component.html',
  styleUrl: './app-market-grid-filter.component.scss',
})
export class AppMarketGridFilterComponent {}
