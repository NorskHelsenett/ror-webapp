import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { AppsService } from '../../services/apps.service';
import { map, Subscription } from 'rxjs';
import { App } from '../../models/app';

@Component({
  selector: 'app-app-market-filter',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, CheckboxModule],
  templateUrl: './app-market-filter.component.html',
  styleUrl: './app-market-filter.component.scss',
})
export class AppMarketFilterComponent implements OnInit, OnDestroy {
  @Output() sortingChange = signal<string>('asc');
  @Output() categoriesChange = signal<string[]>([]);
  selectedSorting = 'asc';

  categories: string[] = ['All', 'Category 1', 'Category 2', 'Category 3'];
  selectedCategories: string[] = [];

  private appsService = inject(AppsService);

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.fetchDistinctCategories();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  sortingSelected(sorting: string): void {
    this.sortingChange.set(sorting);
  }

  categoriesChanged(event: any): void {
    this.categoriesChange.set(event?.checked);
  }

  fetchDistinctCategories(): void {
    this.subscriptions.add(
      this.appsService
        .getApps()
        .pipe(
          map((apps: App[]) => {
            const categories = apps
              .map((app: App) => app.tags)
              .flat()
              .filter(this.onlyUnique)
              .sort();
            this.categories = categories;
            return categories;
          }),
        )
        .subscribe(),
    );
  }

  clearFilters(): void {
    this.selectedSorting = 'desc';
    this.selectedCategories = [];
    this.sortingChange.set('desc');
    this.categoriesChange.set([]);
  }

  private onlyUnique(value: any, index: any, array: string | any[]) {
    return array.indexOf(value) === index;
  }
}
