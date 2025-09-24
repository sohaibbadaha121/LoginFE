import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthuenticated(): boolean {
    return !!this.token;
  }

  get token(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  set token(token: string) {
    if (token && typeof localStorage !== 'undefined') {
      localStorage.setItem('authToken', token);
    } else if (!token) {
      console.warn('Attempting to set undefined/null token');
    }
  }
  get email(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authEmail');
    }
    return null;
  }

  set email(email: string | null) {
    if (typeof localStorage !== 'undefined') {
      if (email) {
        localStorage.setItem('authEmail', email);
      } else {
        localStorage.removeItem('authEmail');
      }
    }
  }

  clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authEmail');
    }
  }
}
