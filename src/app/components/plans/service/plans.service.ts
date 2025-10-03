import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private BaseUrl = `${environment.apiUrl}/subscription`

  constructor(
    private http: HttpClient
  ) { }

  getAllPlans() {
    return this.http.get(`${this.BaseUrl}`)
  }

  getPlanByID(id: number) {
    return this.http.get(`${this.BaseUrl}/get-subscription-plans-by?id=${id}`)
  }

  addPlan(itm: any) {
    return this.http.post(`${this.BaseUrl}`, itm)
  }

  deletePlan(id: any) {
    return this.http.delete(`${this.BaseUrl}/${id}`)
  }
}
