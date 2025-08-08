import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';

   private tokenKey = 'jwt';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

    public isLoggedIn$ = this.loggedInSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {}


    private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  userLogin(credentials: { username: string; password: string }) {
    console.log('Attempting to login with credentials:', credentials);
    
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(tap(res => {
        localStorage.setItem('jwt', res.token);
      }));
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

}
