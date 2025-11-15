import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

type LoginResponse =  { token: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  isAuthenticated() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
    return loggedUser != null;
  }

  getToken(): string | null {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
    return loggedUser?.token || null;
  }

  loginUser(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.API_URL}login`, { email, password })
      .pipe(
        tap(({ token }: LoginResponse) => {
          localStorage.setItem("loggedUser", JSON.stringify({ token }));
        }),
        map(res => res?.token? true : false)
      );
  }

  logout() {
    localStorage.removeItem("loggedUser");
  }
}