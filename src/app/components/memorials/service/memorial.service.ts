import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemorialService {

  private OrderUrl = `${environment.apiUrl}/memories`
  private bookingUrl = `${environment.apiUrl}/booking`
  private QrUrl = `${environment.apiUrl}/qr`

  constructor(
    private http: HttpClient
  ) { }

  getMemorialList(params: any) {
    return this.http.get(`${this.OrderUrl}/profiles`, { params })
  }

  getCleaningServices(params: any) {
    return this.http.get(`${this.bookingUrl}/service-bookings`, { params })
  }

  createQR(link: string, filename: string) {
    return this.http.post(`${this.QrUrl}/generate`, { link: link, filename: filename })
  }

}
