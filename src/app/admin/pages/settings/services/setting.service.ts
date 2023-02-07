import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MatterInterface } from '../interfaces/matter.interface';
import { StatusInterface } from '../interfaces/status.interface';

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

  save(record: Partial<MatterInterface>) {
    return this.create(record);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.URL}/${id}`).pipe(first());
  }

  private create(record: Partial<MatterInterface>) {
    return this.httpClient
      .post<MatterInterface>(this.URL, record)
      .pipe(first());
  }
}
