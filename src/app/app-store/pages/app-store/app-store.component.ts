import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppStoreGridComponent } from '../../components/app-store-grid/app-store-grid.component';

@Component({
  selector: 'app-app-store',
  standalone: true,
  imports: [TranslateModule, AppStoreGridComponent],
  templateUrl: './app-store.component.html',
  styleUrl: './app-store.component.scss',
})
export class AppStoreComponent {}
