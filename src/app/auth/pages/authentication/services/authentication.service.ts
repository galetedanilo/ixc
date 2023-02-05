import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { TokenInterface } from 'src/app/shared/interfaces/token.interface';
import { environment } from 'src/environments/environment';

import { AuthenticationInterface } from '../interfaces/authentication.interface';

@Injectable()
export class AuthenticationService {
  private readonly API = environment.API;
  private readonly resource = '/auth/authentication';

  private readonly URL = this.API + this.resource;

  constructor(private http: HttpClient) {}

  authentication(record: Partial<AuthenticationInterface>): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(this.URL, record).pipe(first());
  }
}
