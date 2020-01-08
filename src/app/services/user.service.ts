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
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }

  create(user: User) {
    return this.http.post(`${environment.apiUrl}/api/users`, user);
  }

  delete(id) {
    return this.http.delete(`${environment.apiUrl}/api/users/${id}`);
  }

  get(id) {
    return this.http.get<User>(`${environment.apiUrl}/api/users/${id}}`);
  }

  update(id, body) {
    return this.http.put(`${environment.apiUrl}/api/users/${id}`, body);
  }
}
