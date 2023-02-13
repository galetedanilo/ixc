import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IndeCXInterface } from '../interfaces/inde-cx.interface';
import { JobsInfoInterface } from '../interfaces/jobs-info.interface';
import { MatterInterface } from '../interfaces/matter.interface';
import { StatusInfoInterface } from '../interfaces/status-info.interface';

@Injectable()
export class SettingService {
  private readonly API = environment.API;
  private readonly resource = '/configurations';

  private readonly URL = this.API + this.resource;

  constructor(private httpClient: HttpClient) {}

  getMetters(): Observable<MatterInterface[]> {
    return this.httpClient.get<MatterInterface[]>(`${this.URL}/subjectRelation`).pipe(first());
  }

  getStatusInfo(): Observable<StatusInfoInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<StatusInfoInterface>(`${this.URL}/systemStatus`)
      .pipe(first());
  }

  getJobsInfo(): Observable<JobsInfoInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<JobsInfoInterface>(`${this.URL}/jobconfiguration`)
      .pipe(first());
  }

  saveMatter(record: Partial<MatterInterface>) {
    return this.httpClient
      .post<MatterInterface>(`${this.URL}/subjectRelation`, record)
      .pipe(first());
  }

  saveJobsInfo(record: Partial<JobsInfoInterface>) {
    return this.httpClient
      .put<JobsInfoInterface>(`${this.URL}/jobconfiguration`, record)
      .pipe(first());
  }

  deleteMatter(id: string) {
    return this.httpClient.delete(`${this.URL}/subjectRelation/${id}`).pipe(first());
  }

  executeJob() {
    return this.httpClient.post(`${this.API}/integration/sendResearchToCustomers`, {}).pipe(first());
  }
}
