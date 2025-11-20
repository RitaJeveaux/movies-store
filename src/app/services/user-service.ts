import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }
}
