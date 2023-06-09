import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/login'; // Ajusta la URL según tu backend
    const body = { username, password };

    return this.http.post(url, body);
  }
}