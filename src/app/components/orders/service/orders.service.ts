import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private OrderUrl = `${environment.apiUrl}/orders`

  constructor(
    private http: HttpClient
  ) { }

  getAllOrders(page?: any, limit?: any){
    return this.http.get(`${this.OrderUrl}/all-orders?page=${page}&limit=${limit}`)
  }
}
