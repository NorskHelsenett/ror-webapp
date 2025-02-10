import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AppsService } from '../../services/apps.service';
import { App } from '../../models/app';
import { map, Observable, filter } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-store-grid',
  standalone: true,
  imports: [TranslateModule, AsyncPipe, BadgeModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app-store-grid.component.html',
  styleUrl: './app-store-grid.component.scss',
})
export class AppStoreGridComponent implements OnInit {
  apps$: Observable<App[]> | undefined;
  apps: App[] = [];

  filterQuery = signal<string>('');
  filteredApps: App[] = [];

  private appsService = inject(AppsService);

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.apps$ = this.appsService.getApps().pipe(
      map((apps: App[]) => {
        this.apps = apps.sort((a: App, b: App) => {
          return a.name.localeCompare(b.name);
        });
        this.filteredApps = apps;

        return apps;
      }),
    );
  }

  filterApps(filterQuery: string): void {
    console.log(filterQuery);
    this.filterQuery.set(filterQuery);

    this.filteredApps = this.apps?.filter((app: App) => {
      return app?.name?.toLowerCase()?.includes(filterQuery?.toLowerCase());
    });
  }
}
