import { UserprofileDetailsComponent } from './pages/userprofile-details/userprofile-details.component';
import { isPlatformBrowser, Location, NgClass } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, Inject, PLATFORM_ID, ViewChild, effect, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { UserprofileApikeysComponent } from './pages';
import { Tabs, TabsModule } from 'primeng/tabs';
import { LucideAngularModule, UserIcon, KeyIcon } from 'lucide-angular';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  imports: [TranslateModule, TabsModule, UserprofileDetailsComponent, UserprofileApikeysComponent, LucideAngularModule, RouterModule, NgClass],
})
export class UserprofileComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly userIcon = UserIcon;
  readonly keyIcon = KeyIcon;
  @ViewChild('tabs') tabsComponent: Tabs | undefined;
  idToken: string | undefined;
  accessToken: string | undefined;
  claims: any;
  authHeaders: any;
  expDate: Date = new Date(1970);
  iatDate: Date = new Date(1970);
  rawIsHidden = true;

  tabIndex: string | number = 0;

  tabs: any[] = [
    {
      metadata: '',
      query: '',
    },
    {
      metadata: 'apikeys',
      query: 'tab=apikeys',
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
    private oauthService: OAuthService,
  ) {
    effect(() => {
      this.tabsComponent?.value?.subscribe((value) => {
        this.tabIndex = value;
        this.switchTab();
        this.changeDetector.detectChanges();
      });
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.idToken = this.oauthService.getIdToken();
      this.accessToken = this.oauthService.getAccessToken();
      this.claims = this.oauthService.getIdentityClaims();
      if (this.claims != undefined) {
        this.expDate = new Date(this.claims?.exp * 1000);
        this.iatDate = new Date(this.claims?.iat * 1000);
        this.changeDetector.detectChanges();
      }
      this.authHeaders = this.oauthService.authorizationHeader();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tabIndex = 0;
      if (isPlatformBrowser(this.platformId)) {
        const tab = this.route.snapshot.queryParams['tab'];
        this.route.queryParams.subscribe((params) => {
          if (params['tab']) {
            this.tabs.forEach((value: any, index: number) => {
              if (tab == value?.metadata) {
                this.switchTab();
              }
            });
          }
        });
        // this.tabs.forEach((value: any, index: number) => {
        //   if (tab == value?.metadata) {
        //     this.tabIndex = index;
        //     const newtab: string | number = index;
        //     this.switchTab(index);
        //   }
        // });
      }
      this.changeDetector.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  switchTab(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.location.replaceState('userprofile', this.tabs[this.tabIndex]?.query);
      this.changeDetector.detectChanges();
    }
  }
}
