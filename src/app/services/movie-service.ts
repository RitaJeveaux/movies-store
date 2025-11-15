import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { AuthService } from './auth-service';

type UploadImageResponse = {
  imageUrl: string;
  path?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  API_URL: string = "http://localhost:3000/";

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(`${this.API_URL}movies`);
  }

  createOne(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.API_URL}movies`, movie, { headers: this.getAuthHeaders() });
  }

  getOne(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL}movies/${id}`);
  }

  updateOne(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.API_URL}movies/${id}`, movie, { headers: this.getAuthHeaders() });
  }

  deleteOne(id: string) {
    return this.http.delete(`${this.API_URL}movies/${id}`, { headers: this.getAuthHeaders() });
  }

  uploadImage(file: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    formData.append("imagem", file);
    return this.http.post<UploadImageResponse>(`${this.API_URL}upload`, formData, { headers: this.getAuthHeaders() });
  }
}