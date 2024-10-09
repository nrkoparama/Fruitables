import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';
  loggedIn = false;
  constructor(private httpClient: HttpClient) {}

  getToken() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData).access_token;
    }
    return false;
  }

  getReFreshToken() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData).refresh_token;
    }
    return false;
  }

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login');

      if (jsonData) {
        try {
          let adminAuth = JSON.parse(jsonData);

          if (adminAuth.role === 1) {
            this.loggedIn = true;
          } else {
            this.loggedIn = false;
          }

          resolve(this.loggedIn);
        } catch (error) {
          reject('JSON data sai :)))');
        }
      } else {
        resolve(this.loggedIn);
      }
    });
    return promise;
  }

  checkLogin() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData);
    }
    return false;
  }

  checkAdmin() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      if (JSON.parse(jsonData).role == 1) return JSON.parse(jsonData);
    }
    return false;
  }

  login(body: any): any {
    return this.httpClient.post<any>(`${this.url}/users/login`, body);
  }

  register(body: any): any {
    return this.httpClient.post<any>(`${this.url}/users`, body);
  }
}
