import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private CountUrl = `${environment.apiUrl}/memories/counts`
  private RevenueUrl = `${environment.apiUrl}/revenue`

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

}
