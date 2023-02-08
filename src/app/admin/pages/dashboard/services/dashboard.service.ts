import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RuntimeInterface } from '../interfaces/runtime.interface';

@Injectable()
export class DashboardService {
  private readonly API = environment.API;
  private readonly resource = '/dashboard';

  private readonly URL = this.API + this.resource;

  constructor(private httpClient: HttpClient) {}

  getRuntime(): Observable<RuntimeInterface[]> {
    return this.httpClient.get<RuntimeInterface[]>(this.URL).pipe(first());
  }

  // getStatus(): Observable<StatusInterface> {
  //   //ToDo: colocar a URL correta
  //   return this.httpClient
  //     .get<StatusInterface>(`${this.API}/status`)
  //     .pipe(first());
  // }

  // getJobs(): Observable<JobsInterface> {
  //   //ToDo: colocar a URL correta
  //   return this.httpClient
  //     .get<JobsInterface>(`${this.API}/runtime`)
  //     .pipe(first());
  // }
}
