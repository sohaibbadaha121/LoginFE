import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  set token(token: string) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      console.warn('Attempting to set undefined/null token');
    }
  }

  get token(): string | null {
    return localStorage.getItem('authToken');
  }

  // Additional useful methods
  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  isTokenValid(): boolean {
    return !!this.token;
  }
}
