import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private CountUrl = `${environment.apiUrl}/memories/counts`
  private RevenueUrl = `${environment.apiUrl}/revenue`
  private bookingUrl = `${environment.apiUrl}/booking`
  private orderUrl = `${environment.apiUrl}/orders`

  constructor(
    private http: HttpClient
  ) { }

  getCounts(date: any) {
    return this.http.get(`${this.CountUrl}?date=${date}`)
  }

  getRevenue(filterType: string, service: string = 'all', startDate?: string, endDate?: string) {
    let params = `?filterType=${filterType}&service=${service}`;
    if (filterType === 'range' && startDate && endDate) {
      params += `&startDate=${startDate}&endDate=${endDate}`;
    }
    return this.http.get(`${this.RevenueUrl}${params}`);
  }

  getCleaningServiceToday() {
    const limit = 5;
    const page = 1;
    const today = new Date().toISOString().split('T')[0];

    return this.http.get(`${this.bookingUrl}/service-bookings?page=${page}&limit=${limit}`)
  }

    getOrdersToday() {
    const limit = 5;
    const page = 1;
    const today = new Date().toISOString().split('T')[0];

    return this.http.get(`${this.orderUrl}/memorial-orders?page=${page}&limit=${limit}`)
  }

}
