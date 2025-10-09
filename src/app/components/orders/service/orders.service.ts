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

  getAllOrders(page?: any, limit?: any) {
    return this.http.get(`${this.OrderUrl}/all-orders?page=${page}&limit=${limit}`)
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.OrderUrl}/${id}`)
  }

  updateOrderStatus(id: any, status: string) {
    return this.http.patch(`${this.OrderUrl}/${id}/status`, { status })
  }

  addTrackingDetails(itm: any, id: any) {
    return this.http.patch(`${this.OrderUrl}/${id}/tracking`, itm)
  }
}
