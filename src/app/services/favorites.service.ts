import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token/token-service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private readonly apiUrl = 'http://localhost:8082/favoritesCats';

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.token;
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  saveFavorite(catid: string, email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/save`,
      { catid, email },
      { headers: this.getAuthHeaders() }
    );
  }

  getFavorites(email: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/get_favorites/${email}`, {
      headers: this.getAuthHeaders(),
    });
  }

  removeFavorite(catid: string, email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${email}/${catid}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
