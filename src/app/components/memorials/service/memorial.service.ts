import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemorialService {

  private OrderUrl = `${environment.apiUrl}/orders`
  private bookingUrl = `${environment.apiUrl}/booking`

  constructor(
    private http: HttpClient
  ) { }

  getOrderList(params: any) {
    return this.http.get(`${this.OrderUrl}/memorial-orders`, { params })
  }

  getCleaningServices(params: any) {
    return this.http.get(`${this.bookingUrl}/service-bookings`, { params })
  }

}
