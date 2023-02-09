import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MatterInterface } from '../interfaces/matter.interface';
import { JobsInterface } from '../interfaces/jobs.interface';
import { StatusInterface } from '../interfaces/status.interface';
import { IndeCXInterface } from '../interfaces/inde-cx.interface';

@Injectable()
export class SettingService {
  private readonly API = environment.API;
  private readonly resource = '/settings';

  private readonly URL = this.API + this.resource;

  constructor(private httpClient: HttpClient) {}

  getMetters(): Observable<MatterInterface[]> {
    return this.httpClient.get<MatterInterface[]>(this.URL).pipe(first());
  }

  getStatus(): Observable<StatusInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<StatusInterface>(`${this.API}/status`)
      .pipe(first());
  }

  getJobs(): Observable<JobsInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<JobsInterface>(`${this.API}/runtime`)
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

  saveJobs(record: Partial<JobsInterface>) {
    //ToDo: colocar a URL correta
    return this.httpClient
      .post<JobsInterface>(`${this.API}/runtime`, record)
      .pipe(first());
  }

  deleteMatter(id: string) {
    return this.httpClient.delete(`${this.URL}/${id}`).pipe(first());
  }
}
