import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private urlCartApi = environment.apiUrl + '/cart';
  private urlCheckoutApi = environment.apiUrl + '/checkout';

  constructor(
    private http: HttpClient
  ) { }

  getCarts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.urlCartApi)
  }

  addToCart(product: Product): Observable<void>{
    return this.http.post<void>(this.urlCartApi, product)
  }

  clearCart(): Observable<void>{
    return this.http.delete<void>(this.urlCartApi)
  }

  checkoutCart(product: Product[]): Observable<void>{
    return this.http.post<void>(this.urlCheckoutApi, product)
  }
  
}
