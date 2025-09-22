import { confirm } from '../../../services/functions';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activat-account',
  imports: [CommonModule, FormsModule, CodeInputModule],
  templateUrl: './activat-account.html',
  styleUrl: './activat-account.css',
})
export class ActivatAccount {
  message: string = '';
  isOk: boolean = true;
  success: boolean = false;

  @ViewChild(CodeInputComponent) codeInput!: CodeInputComponent;

  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly rootUrl = 'http://localhost:8082';

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  confirmAccount(token: string) {
    confirm(this.http, this.rootUrl, { token }).subscribe({
      next: (response) => {
        this.message = 'Account activated successfully. You can now log in.';
        this.success = true;
        this.isOk = true;
        console.log('Account activated successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message =
          'Activation failed. The token may be invalid or expired.';
        this.success = true;
        this.isOk = false;

        if (this.codeInput) {
          this.codeInput.reset();
        }

        console.error('Activation error:', err);
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  tryAgain() {
    this.success = false;
    this.isOk = true;
    this.message = '';
    if (this.codeInput) {
      this.codeInput.reset();
    }
  }
}
