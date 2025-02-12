import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { catchError, finalize, map, Observable, Subscription, tap } from 'rxjs';
import { Cluster } from '../../../core/models/cluster';
import { DropdownModule } from 'primeng/dropdown';
import { App } from '../../models/app';
import { AppsService } from '../../services/apps.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Namespace } from '../../models/namespace';
import { NamespacesService } from '../../services/namespaces.service';
import YAML from 'yaml';
import { MockClustersService } from '../../services/mock-clusters.service';
import { DomSanitizer } from '@angular/platform-browser';
import { version } from 'os';

@Component({
  selector: 'app-app-market-install',
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
  templateUrl: './app-market-install.component.html',
  styleUrl: './app-market-install.component.scss',
})
export class AppMarketInstallComponent implements OnInit, OnDestroy {
  appInstallForm: FormGroup = new FormGroup({
    cluster: new FormControl('', [Validators.required]),
    namespace: new FormControl('', [Validators.required, Validators.minLength(1)]),
    version: new FormControl('', [Validators.required]),
    values: new FormControl(''),
  });

  clusters$: Observable<Cluster[]> | undefined;
  clusters: Cluster[] = [];
  app: App | undefined;
  appId: string | undefined;
  fetchClustersError: any;

  namespaces$: Observable<Namespace[]> | undefined;
  namespaces: Namespace[] = [];
  fetchNamespacesError: any;

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
  private mockClustersService = inject(MockClustersService);
  private appService = inject(AppsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private namespacesService = inject(NamespacesService);
  private subscriptions = new Subscription();
  private sanitizer = inject(DomSanitizer);

  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    this.appInstallForm = this.formBuilder.group({
      cluster: [null, [Validators.required]],
      namespace: [null, [Validators.required, Validators.minLength(1)]],
      version: [null, [Validators.required]],
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

    this.fetchClusters();
    this.fetchNamespaces();
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
            if (!app) {
              this.code = this.codeDefault;
            } else {
              this.app = app;
              this.code = YAML.stringify(app?.config);
            }
            this.appInstallForm.patchValue({ version: app?.currentVersion });

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

  fetchNamespaces(): void {
    this.namespaces$ = this.namespacesService.getNamespaces().pipe(
      map((namespaces: Namespace[]) => {
        this.namespaces = namespaces;
        return namespaces;
      }),
      catchError((error) => {
        console.error('Error fetching namespaces', error);
        this.fetchNamespacesError = error;
        return [];
      }),
    );
  }

  fetchClusters(): void {
    this.clusters$ = this.mockClustersService.getClusters(0, 1000).pipe(
      map((clusters: Cluster[]) => {
        this.clusters = clusters.sort((a, b) => a.clusterName.localeCompare(b.clusterName));
        return clusters;
      }),
      catchError((error) => {
        console.error('Error fetching clusters', error);
        this.fetchClustersError = error;
        return [];
      }),
      finalize(() => {
        this.changeDetector.detectChanges();
      }),
    );
  }

  clusterSelected(event: any): void {
    //this.appmarketform?.get('cluster')?.setValue(cluster);
  }

  namespaceSelected(event: any): void {
    //this.appmarketform?.get('namespace')?.setValue(namespace);
  }

  versionSelected(event: any): void {
    //this.appmarketform?.get('namespace')?.setValue(namespace);
  }

  reset(): void {
    this.appInstallForm.reset();
    if (!this.app) {
      this.code = this.codeDefault;
    } else {
      this.code = YAML.stringify(this.app?.config);
      this.appInstallForm.patchValue({ version: this.app?.currentVersion });
    }

    this.changeDetector.detectChanges();
  }

  installApp(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('pages.appmarket.install.installing') });
    setTimeout(() => {
      this.router.navigate(['/appmarket']);
    }, 750);
  }

  getSafelyUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
