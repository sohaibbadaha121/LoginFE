import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StrictHttpResponse } from '../../strict-http-response';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { authenticate } from './authenticate';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rootUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  login(
    body: AuthenticationRequest,
    context?: HttpContext
  ): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, { body }, context);
  }
}
