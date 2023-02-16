import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { StorageService } from '../storege/storage.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.storageService.isLoggedIn()) {
      const user = this.storageService.getUser();
      const headers = req.headers.set('Authorization', 'Bearer ' + user.token);
      req = req.clone({ headers });
    }

    return next.handle(req).pipe(
      tap({
        error: (httpError: HttpErrorResponse) => {
          if (httpError.status === HttpStatusCode.Unauthorized) {
            this.storageService.clear();
            this.router.navigate(['auth', 'authentication']);
          }
        },
      })
    );
  }
}
