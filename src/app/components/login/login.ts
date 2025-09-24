import { Component, inject } from '@angular/core';
import { AuthenticationRequest } from '../../services/openapiServices/models/authentication-request';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { authenticate } from '../../services/openapiServices/fn/auth-controller/authenticate';
import { TokenService } from '../../services/tokenService/token-service';

@Component({
  selector: 'app-login',
  imports: [
    DividerModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenservice = inject(TokenService);

  private readonly rootUrl = 'http://localhost:8082';

  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMessage: Array<string> = [];
  loading = false;

  login() {
    this.errorMessage = [];

    if (!this.authRequest.email || !this.authRequest.password) {
      this.errorMessage = ['Email and password are required'];
      return;
    }

    this.loading = true;

    authenticate(this.http, this.rootUrl, {
      body: this.authRequest,
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        const authResponse = response.body;
        if (authResponse?.token) {
          this.tokenservice.token = authResponse.token;
          this.tokenservice.email = authResponse.email;
          this.router.navigate(['/cats']);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loading = false;

        if (err.status === 401) {
          this.errorMessage = ['Invalid email or password'];
        } else if (err.status === 400) {
          this.errorMessage = ['Invalid request. Please check your input'];
        } else if (err.status === 0) {
          this.errorMessage = [
            'Cannot connect to server. Please try again later',
          ];
        } else {
          this.errorMessage = ['Login failed. Please try again'];
        }
      },
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
