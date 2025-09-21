import { Component } from '@angular/core';
import { RegistrationRequest } from '../../../services/models';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { register } from '../../../services/fn/auth-controller/register';

@Component({
  selector: 'app-register',
  imports: [
    DividerModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly rootUrl = 'http://localhost:8082';

  registeRequest: RegistrationRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  errorMessage: Array<string> = [];
  loading = false;

  login() {
    this.router.navigate(['/login']);
  }

  SignUp() {
    this.errorMessage = [];

    if (!this.registeRequest.firstname) {
      this.errorMessage.push('First name is required');
    }
    if (!this.registeRequest.lastname) {
      this.errorMessage.push('Last name is required');
    }
    if (!this.registeRequest.email) {
      this.errorMessage.push('Email is required');
    }
    if (!this.registeRequest.password) {
      this.errorMessage.push('Password is required');
    } else if (this.registeRequest.password.length < 8) {
      this.errorMessage.push('Password must be at least 8 characters long');
    }

    if (this.errorMessage.length > 0) {
      return;
    }

    this.loading = true;

    register(this.http, this.rootUrl, {
      body: this.registeRequest,
    }).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert(
          'Registration successful! Please check your email to activate your account.'
        );
        this.loading = false;
        this.router.navigate(['/activate-account']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.loading = false;

        if (err.status === 400) {
          if (err.error && err.error.message) {
            this.errorMessage = [err.error.message];
          } else {
            this.errorMessage = [
              'Invalid registration data. Please check your input.',
            ];
          }
        } else if (err.status === 409) {
          this.errorMessage = ['An account with this email already exists'];
        } else if (err.status === 422) {
          this.errorMessage = ['Please check all fields and try again'];
        } else if (err.status === 0) {
          this.errorMessage = [
            'Cannot connect to server. Please try again later.',
          ];
        } else {
          this.errorMessage = ['Registration failed. Please try again.'];
        }
      },
    });
  }
}
