import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppStoreGridComponent } from '../../components/app-store-grid/app-store-grid.component';
import { AppStoreFilterComponent } from '../../components/app-store-filter/app-store-filter.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-store',
  standalone: true,
  imports: [TranslateModule, AppStoreGridComponent, AppStoreFilterComponent, RouterModule],
  templateUrl: './app-store.component.html',
  styleUrl: './app-store.component.scss',
})
export class AppStoreComponent {}
