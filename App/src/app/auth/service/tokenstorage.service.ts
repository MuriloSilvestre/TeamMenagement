import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserEntity } from '../../user/entities/user.entity';

const TOKEN_KEY = 'acessToken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenstorageService {
  constructor(private route: Router) {}

  signOut(): void {
    window.localStorage.clear();
    window.location.reload();
    this.route.navigate(['/home']);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public saveUser(user: UserEntity): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getRole(): string | null {
    const user = window.localStorage.getItem(USER_KEY);

    if (user) {
      var userParsed = JSON.parse(user);
      return userParsed.role;
    }

    return null;
  }
}
