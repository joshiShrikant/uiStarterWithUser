import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

getProfile(): Observable<any> {
  return this.http.get(this.apiUrl + '/profile')
}

  updateProfile(data: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.apiUrl + '/profile', data, { headers });
  }

  uploadProfilePicture(base64Image: string): Observable<any> {
  return this.http.put(this.apiUrl + '/profile/picture', { image: base64Image });
}

}
