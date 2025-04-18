import { ApplicationConfig, importProvidersFrom, isDevMode, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { provideServiceWorker } from '@angular/service-worker';
import { TranslateLoader, TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';
import { CustomMissingTranslationHandler, HttpLoaderFactory } from './core/i18n/i18nfunctions';
import { isPlatformServer } from '@angular/common';
import RorTheme from './themes/ror-theme';
import { ThemeService } from './core/services/theme.service';
import { provideServerRouting } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import { TypesService } from './resources/services/types.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withRouterConfig({
        onSameUrlNavigation: 'ignore',
      }),
    ),
    provideServerRouting(serverRoutes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: OAuthStorage,
      useFactory: (platformId: object) => {
        if (isPlatformServer(platformId)) {
          return {}; // Return an empty object on the server
        }
        return sessionStorage;
      },
      deps: [PLATFORM_ID],
    },
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
      },
    }),
    importProvidersFrom([
      TranslateModule.forRoot({
        missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomMissingTranslationHandler },
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    MessageService,
    ThemeService,
    ConfirmationService,
    TypesService,
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: RorTheme,
        options: {
          darkModeSelector: '.dark',
          variants: '',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, app-styles, theme, base, primeng',
          },
        },
      },
    }),
    provideHighlightOptions({
      lineNumbersOptions: {
        singleLine: false,
      },
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      themePath: 'assets/styles/highlight/tokyo-night-light.css',
      languages: {
        bash: () => import('highlight.js/lib/languages/bash'),
        json: () => import('highlight.js/lib/languages/json'),
      },
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
