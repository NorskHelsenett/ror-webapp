import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-app-store-grid-filter',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './app-store-grid-filter.component.html',
  styleUrl: './app-store-grid-filter.component.scss',
})
export class AppStoreGridFilterComponent {}
