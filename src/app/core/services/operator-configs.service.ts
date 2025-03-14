import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperatorConfig } from '../models/operatorconfig';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class OperatorConfigsService {
  private configService = inject(ConfigService);
  private httpClient = inject(HttpClient);

  getAll(): Observable<OperatorConfig[]> {
    const url = `${this.configService.config.rorApi}/v1/operatorconfigs`;
    return this.httpClient.get<OperatorConfig[]>(url);
  }

  getById(id: string): Observable<OperatorConfig> {
    const url = `${this.configService.config.rorApi}/v1/operatorconfigs/${id}`;
    return this.httpClient.get<OperatorConfig>(url);
  }
}
