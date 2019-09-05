import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  newUser(user: User) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  delete(id) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  getUser(id) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}}`);
  }

  updateUser(id, body) {
    this.http.put(`${environment.apiUrl}/users/${id}`, body).subscribe();
  }
}
