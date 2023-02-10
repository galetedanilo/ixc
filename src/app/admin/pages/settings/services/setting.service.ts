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
  private readonly resource = '/settings';

  private readonly URL = this.API + this.resource;

  constructor(private httpClient: HttpClient) {}

  getMetters(): Observable<MatterInterface[]> {
    return this.httpClient.get<MatterInterface[]>(this.URL).pipe(first());
  }

  getStatusInfo(): Observable<StatusInfoInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<StatusInfoInterface>(`${this.API}/status`)
      .pipe(first());
  }

  getJobsInfo(): Observable<JobsInfoInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<JobsInfoInterface>(`${this.API}/runtime`)
      .pipe(first());
  }

  getIndeCX(): Observable<IndeCXInterface[]> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<IndeCXInterface[]>(`${this.API}/indeCX`)
      .pipe(first());
  }

  saveMatter(record: Partial<MatterInterface>) {
    return this.httpClient
      .post<MatterInterface>(this.URL, record)
      .pipe(first());
  }

  saveJobsInfo(record: Partial<JobsInfoInterface>) {
    //ToDo: colocar a URL correta
    return this.httpClient
      .post<JobsInfoInterface>(`${this.API}/runtime`, record)
      .pipe(first());
  }

  deleteMatter(id: string) {
    return this.httpClient.delete(`${this.URL}/${id}`).pipe(first());
  }
}
