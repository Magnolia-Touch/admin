import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private CountUrl = `${environment.apiUrl}/memories/counts`

  constructor(
    private http: HttpClient
  ) { }

  getCounts(date: any) {
    return this.http.get(`${this.CountUrl}?date=${date}`)
  }
}
