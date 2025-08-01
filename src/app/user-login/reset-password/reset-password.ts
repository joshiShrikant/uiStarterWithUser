import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MaterialModule } from '../../coreModules/material.module';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
   email = '';
  newPassword = '';
  message = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  resetPassword() {
    const payload = { email: this.email, newPassword: this.newPassword };

    this.http.post('http://localhost:8080/api/auth/reset-password', payload).subscribe({
      next: () => {
        this.message = 'Password reset successful! You can now login.';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.errorMessage = 'Reset failed: ' + err.error.message;
        this.message = '';
      }
    });
  }

}
