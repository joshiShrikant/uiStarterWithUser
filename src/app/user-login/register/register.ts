import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MaterialModule } from '../../coreModules/material.module';

@Component({
  selector: 'app-register',
  imports: [ 
    CommonModule,
    FormsModule,
    MaterialModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

   username = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/api/auth/register', user).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: err => {
        alert('Registration failed: ' + err.error.message);
      }
    });
  }

}
