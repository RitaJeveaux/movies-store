import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable, tap } from 'rxjs';

type LoginResponse = { token: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = "http://localhost:3000/";
  private expTimer: any;

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
    return loggedUser != null;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = jwtDecode(token);
    if (!payload.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now;
  }

  getToken(): string | null {
    const { token } = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    if (!token) return null;
    return token;
  }

  loginUser(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.API_URL}login`, { email, password })
      .pipe(
        tap(({ token }: LoginResponse) => {
          localStorage.setItem("loggedUser", JSON.stringify({ token }));
          this.scheduleLogout();
        }),
        map(res => res?.token ? true : false)
      );
  }

  logout() {
    localStorage.removeItem("loggedUser");
  }
  scheduleLogout() {
    clearTimeout(this.expTimer);

    const token = this.getToken();
    if (!token) return;

    const payload = jwtDecode(token);
    if (!payload.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const timeUntilExp = Math.max((payload.exp - now), 0);

    this.expTimer = setTimeout(() => this.logout(), timeUntilExp * 1000);
  }

  checkLoginExpiration() {
    if (this.isTokenExpired()) {
      this.logout();
      return;
    }

    this.scheduleLogout();
  }
}