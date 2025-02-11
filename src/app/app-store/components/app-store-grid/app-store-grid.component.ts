import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AppsService } from '../../services/apps.service';
import { App } from '../../models/app';
import { map, Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-app-store-grid',
  standalone: true,
  imports: [
    TranslateModule,
    AsyncPipe,
    BadgeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './app-store-grid.component.html',
  styleUrl: './app-store-grid.component.scss',
})
export class AppStoreGridComponent implements OnInit {
  @Input() set sortingChanged(value: string) {
    this.sorting = value;
    this.fetch();
  }

  @Input() set categoriesChanged(value: string[]) {
    if (!value) {
      this.categories = [];
      return;
    }

    this.categories = value;
    this.filterApps(this.filterQuery());
  }

  apps$: Observable<App[]> | undefined;
  apps: App[] = [];

  filterQuery = signal<string>('');
  filteredApps: App[] = [];
  categories: string[] = [];

  private sorting = 'desc';

  private appsService = inject(AppsService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  deleteApp(appId: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('pages.appstore.deleteConfirmation'),
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('pages.appstore.deleteSuccess') });
      },
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.apps$ = this.appsService.getApps().pipe(
      map((apps: App[]) => {
        this.apps = apps.sort((a: App, b: App) => {
          if (this.sorting === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
        this.filteredApps = apps;
        return apps;
      }),
    );
  }

  filterApps(filterQuery: string): void {
    this.filterQuery.set(filterQuery);

    this.filteredApps = this.apps?.filter((app: App) => {
      return app?.name?.toLowerCase()?.includes(filterQuery?.toLowerCase());
    });

    if (this.categories?.length > 0) {
      this.filteredApps = this.filteredApps.filter((app: App) => {
        return app.tags.some((tag: string) => this.categories.includes(tag));
      });
    }
  }
}
