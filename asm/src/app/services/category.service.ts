import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private auth: AuthService) {}

  // notes dưới đây ko phải là medthod, đặt sao dùng dc thôi vc xử thuộc về api từ httpClient.....
  getAll() {
    const headers = {"Authorization": "Bearer " + this.auth.getToken()}
    return this.httpClient.get(`${this.url}/categories`, {headers});
  }

  get(id: string) {
    return this.httpClient.get(`${this.url}/categories/${id}`);
  }

  save(category: Category) {
    return this.httpClient.post(`${this.url}/categories`, category);
  }

  update(id: string, category: Category) {
    return this.httpClient.put(`${this.url}/categories/${id}`, category);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/categories/${id}`);
  }
}
