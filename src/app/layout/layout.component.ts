import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy, inject, PLATFORM_ID, Inject } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';
import { Observable, Subscription, catchError, share, tap } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { AclService } from '../core/services/acl.service';
import { AclAccess, AclScopes } from '../core/models/acl-scopes';
import { SseService } from '../create/create-cluster/services/sse.service';
import { SignalService } from '../create/create-cluster/services/signal.service';
import { BigEventsService } from '../core/services/big-events.service';
import { environment } from '../../environments/environment';
import { ConfigService } from '../core/services/config.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private configService = inject(ConfigService);
  appVersion = environment.appVersion;
  isDark = false;
  showUserMenu = false;
  showSubMenu = false;
  showMobileMenu = false;
  showNotifications = false;
  showSettings = false;
  showSearch = false;
  lang = '';
  currentYear: number;
  birthday = false;
  desember = false;
  christmas = false;
  rorDocsUrl: string | undefined;
  externalDocsUrl: string | undefined;

  adminRead$: Observable<boolean> | undefined;
  adminOwner$: Observable<boolean> | undefined;
  aclFetchError: any;

  sse$: Observable<any> | undefined;

  private subscriptions = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private changeDetector: ChangeDetectorRef,
    private themeService: ThemeService,
    private authService: AuthService,
    private translateService: TranslateService,
    private aclService: AclService,
    private sseService: SseService,
    private signalService: SignalService,
    private bigEventsService: BigEventsService,
  ) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDark.value;
    this.lang = this.translateService.currentLang;
    this.fetchAcl();

    this.desember = this.bigEventsService.isDesember();
    this.birthday = this.bigEventsService.isRORBirthday();

    if (isPlatformBrowser(this.platformId)) {
      this.setupSSEClients();
    }

    this.rorDocsUrl = this.configService.config.docsUrl;
    this.externalDocsUrl = this.configService.config.externalDocsUrl;

    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchAcl(): void {
    this.aclFetchError = undefined;
    this.adminRead$ = this.aclService.check(AclScopes.ROR, AclScopes.Global, AclAccess.Read).pipe(
      share(),
      catchError((error: any) => {
        this.aclFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
    this.adminOwner$ = this.aclService.check(AclScopes.ROR, AclScopes.Global, AclAccess.Owner).pipe(
      share(),
      catchError((error: any) => {
        this.aclFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
  }

  toggleDark(): void {
    this.isDark = !this.isDark;
    this.themeService.setDark(this.isDark);
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleSubMenu(): void {
    this.showSubMenu = !this.showSubMenu;
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  logout(): void {
    this.toggleUserMenu();
    this.authService.logout();
  }

  useLanguage(lang: string): void {
    if (!lang || (lang !== 'en' && lang !== 'no')) {
      return;
    }

    this.translateService.use(lang);
    this.lang = lang;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
    this.changeDetector.detectChanges();
  }

  setupSSEClients(): void {
    if (this.sse$) {
      return;
    }

    if (this.sseService?.isConnected) {
      return;
    }

    this.sse$ = this.sseService.getEvents().pipe(
      tap((event) => {
        this.signalService.handleEvent(event);
      }),
    );
  }
}
