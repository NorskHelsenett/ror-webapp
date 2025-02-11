import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ClustersService } from '../../../core/services/clusters.service';
import { catchError, finalize, map, Observable, Subscription, tap } from 'rxjs';
import { PaginationResult } from '../../../core/models/paginatedResult';
import { Cluster } from '../../../core/models/cluster';
import { DropdownModule } from 'primeng/dropdown';
import { App } from '../../models/app';
import { AppsService } from '../../services/apps.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-app-store-install',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    DropdownModule,
    RouterModule,
    MonacoEditorModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './app-store-install.component.html',
  styleUrl: './app-store-install.component.scss',
})
export class AppStoreInstallComponent implements OnInit, OnDestroy {
  appInstallForm: FormGroup = new FormGroup({
    cluster: new FormControl('', [Validators.required]),
    namespace: new FormControl('', [Validators.required, Validators.minLength(1)]),
    values: new FormControl(''),
  });

  clusters$: Observable<PaginationResult<Cluster>> | undefined;
  clusters: Cluster[] = [];
  app: App | undefined;
  appId: string | undefined;
  fetchClustersError: any;

  editorOptions = { theme: 'vs-dark', language: 'yaml' };
  codeDefault: string = `values:
    prop1: test1
    prop2: test2
    array1:
      - item1
      - item2`;
  code: string = '';

  private formBuilder = inject(FormBuilder);
  private changeDetector = inject(ChangeDetectorRef);
  private clustersService = inject(ClustersService);
  private appService = inject(AppsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subscriptions = new Subscription();

  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    this.appInstallForm = this.formBuilder.group({
      cluster: [null, [Validators.required]],
      namespace: [null, [Validators.required, Validators.minLength(1)]],
      values: [''],
    });
    this.subscriptions.add(
      this.route.params
        .pipe(
          tap((data: any) => {
            this.appId = data?.appId;
            this.fetchApp();
          }),
        )
        .subscribe(),
    );
    this.code = this.codeDefault;

    this.fetchClusters();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchApp(): void {
    this.subscriptions.add(
      this.appService
        .getAppById(this.appId)
        .pipe(
          map((app: App) => {
            this.app = app;
            return app;
          }),
          finalize(() => {
            this.changeDetector.detectChanges();
          }),
        )
        .subscribe(),
    );
  }

  fetchClusters(): void {
    this.clusters$ = this.clustersService
      .getByFilter({
        skip: 0,
        limit: 1000,
      })
      .pipe(
        map((clusters: PaginationResult<Cluster>) => {
          this.clusters = clusters?.data;
          return clusters;
        }),
        catchError((error) => {
          console.error('Error fetching clusters', error);
          this.fetchClustersError = error;
          return [];
        }),
      );
  }

  clusterSelected(event: any): void {
    //this.appstoreform?.get('cluster')?.setValue(cluster);
  }

  namespaceSelected(event: any): void {
    //this.appstoreform?.get('namespace')?.setValue(namespace);
  }

  reset(): void {
    this.appInstallForm.reset();
    this.code = this.codeDefault;
    this.changeDetector.detectChanges();
  }

  installApp(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('pages.appstore.install.installing') });
    setTimeout(() => {
      this.router.navigate(['/appstore']);
    }, 750);
  }
}
