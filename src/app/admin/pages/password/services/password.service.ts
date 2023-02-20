import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ChangePasswordInterface } from '../interfaces/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private readonly API = environment.API;
  private readonly resource = '/user';

  private readonly URL = this.API + this.resource;

  constructor(private httpClient: HttpClient) {}

  changePassword(record: Partial<ChangePasswordInterface>) {
    return this.httpClient.put<void>(`${this.URL}/${record.id}/password`, record).pipe(first());
  }
}
