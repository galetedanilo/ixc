import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly API = environment.API;
  private readonly resource = '/users';

  private readonly URL = this.API + this.resource;

  constructor(private httpClient: HttpClient) {}

  listAll(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(this.URL).pipe(first());
  }

  save(record: Partial<UserInterface>) {
    if (record.id) {
      return this.update(record);
    }

    return this.create(record);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.URL}/${id}`).pipe(first());
  }

  private create(record: Partial<UserInterface>) {
    return this.httpClient.post<UserInterface>(this.URL, record).pipe(first());
  }

  private update(record: Partial<UserInterface>) {
    return this.httpClient
      .put<UserInterface>(`${this.URL}/${record.id}`, record)
      .pipe(first());
  }
}
