import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:3000';

constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get(`${this.url}/products`)
  }

  get(id: string){
    return this.httpClient.get(`${this.url}/products/${id}`)
  }

  save(product: FormData): Observable<any>{
    return this.httpClient.post(`${this.url}/products`, product)
  }

  update(id:string, product: Product){
    return this.httpClient.put(`${this.url}/products/${id}`, product)
  }

  delete(id:string){
    return this.httpClient.delete(`${this.url}/products/${id}`)
  }

}
