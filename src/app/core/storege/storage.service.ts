import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  clear(): void {
    window.sessionStorage.clear();
    this.isLogged.next(false);
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.isLogged.next(true)
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {}
  }

  isLoggedIn(): boolean {
    return this.isLogged.getValue();
  }
}
