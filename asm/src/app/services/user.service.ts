import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${this.url}/users`);
  }

  get(id: string) {
    return this.httpClient.get(`${this.url}/users/${id}`);
  }

  // hàm đăng ký
  save(user: User) {
    return this.httpClient.post<any>(`${this.url}/users`, user);
  }

  update(id: string, user: User) {
    return this.httpClient.put(`${this.url}/users/${id}`, user);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/users/${id}`);
  }
}
