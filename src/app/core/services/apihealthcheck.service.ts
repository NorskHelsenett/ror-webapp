import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthCheck } from '../models/healthcheck';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private configService = inject(ConfigService);
  private httpClient = inject(HttpClient);

  getHealth(): Observable<HealthCheck> {
    const url = `${this.configService.config.rorApi}/health`;
    return this.httpClient.get<HealthCheck>(url);
  }
}
