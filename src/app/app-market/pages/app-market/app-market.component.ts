import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppMarketGridComponent } from '../../components/app-market-grid/app-market-grid.component';
import { AppMarketFilterComponent } from '../../components/app-market-filter/app-market-filter.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-market',
  standalone: true,
  imports: [TranslateModule, AppMarketGridComponent, AppMarketFilterComponent, RouterModule],
  templateUrl: './app-market.component.html',
  styleUrl: './app-market.component.scss',
})
export class AppMarketComponent {}
