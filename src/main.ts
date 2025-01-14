import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { APP_CONFIG } from './app.config';

fetch(environment.configPath)
  .then((response) => response.json())
  .then((config) => {
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.error(err);
    return 'Failed to load config';
  });
