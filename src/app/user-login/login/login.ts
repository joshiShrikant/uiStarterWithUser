import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MaterialModule } from '../../coreModules/material.module';
import { AuthService } from '../../services/AuthService';

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

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const credentials = { username: this.username, password: this.password };
    this.authService.userLogin(credentials).subscribe({
      next: response => {
        this.authService.login(response.token); // Store token + update login state
        this.router.navigate(['/']); // Redirect after login

      },
      error: err => {
        this.errorMessage = 'Invalid username or password from server';
      }
    });
  }

}
