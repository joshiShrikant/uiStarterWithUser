import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../coreModules/material.module';

@Component({
  selector: 'app-profile',
  imports: [ CommonModule,
    HttpClientModule,
    MaterialModule,],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: { username: string, email: string } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.http.get<{ username: string, email: string }>('http://localhost:8080/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: data => this.user = data,
        error: () => this.user = null
      });
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  }

}
