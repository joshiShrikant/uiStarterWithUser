import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MaterialModule } from '../../coreModules/material.module';

@Component({
  selector: 'app-login',
  imports: [
     CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };
    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', credentials).subscribe({
      next: res => {
        localStorage.setItem('jwt', res.token);
        this.router.navigate(['/']);  // Redirect to home/dashboard
      },
      error: err => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

}
