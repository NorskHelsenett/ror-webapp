import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { ComplianceReport } from '../models/complianceReport';

@Injectable({
  providedIn: 'root',
})
export class ComplianceReportsService {
  private configService = inject(ConfigService);
  private httpClient = inject(HttpClient);

  getComplianceReports(id: string): Observable<ComplianceReport[]> {
    const url: string = `${this.configService.config.rorApi}/v1/clusters/${id}/views/compliancereports`;
    return this.httpClient.get<ComplianceReport[]>(url);
  }

  getComplianceReportsGlobal(): Observable<ComplianceReport[]> {
    const url: string = `${this.configService.config.rorApi}/v1/clusters/views/compliancereports`;
    return this.httpClient.get<ComplianceReport[]>(url);
  }
}
