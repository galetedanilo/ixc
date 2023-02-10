import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { JobsInfoInterface } from '../interfaces/jobs-info.interface';
import { RuntimeInterface } from '../interfaces/runtime.interface';
import { SystemInfoInterface } from '../interfaces/system-info.interface';

@Injectable()
export class DashboardService {
  private readonly API = environment.API;
  private readonly resource = '/dashboard';

  private readonly URL = this.API + this.resource;

  constructor(private httpClient: HttpClient) {}

  getRuntime(): Observable<RuntimeInterface[]> {
    return this.httpClient.get<RuntimeInterface[]>(this.URL).pipe(first());
  }

  getIndeCX(): Observable<SystemInfoInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<SystemInfoInterface>(`${this.API}/indeCXInfo`)
      .pipe(first());
  }

  getIxc(): Observable<SystemInfoInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<SystemInfoInterface>(`${this.API}/indeIxcInfo`)
      .pipe(first());
  }

  getJobsInfo(): Observable<JobsInfoInterface> {
    //ToDo: colocar a URL correta
    return this.httpClient
      .get<JobsInfoInterface>(`${this.API}/jobsinfo`)
      .pipe(first());
  }
}
