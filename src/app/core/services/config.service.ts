import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: AppConfig;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.config = config;
    if (!config) {
      console.error('Config not loaded');
      return;
    }
    this.config.auth.redirectUri = window.location.origin + this.config.auth.redirectUri;
  }
}
