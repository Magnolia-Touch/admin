import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {

  private BaseUrl = `${environment.apiUrl}/flowers`

  constructor(
    private http: HttpClient
  ) { }

  getAllFlowers() {
    return this.http.get(`${this.BaseUrl}/get-all-flower`)
  }

  addFlower(itm: any) {
    return this.http.post(`${this.BaseUrl}/add-flower`, itm)
  }

  updateFlowerStock(itm: any, id: string) {
    return this.http.patch(`${this.BaseUrl}/update-flower-stock?id=${id}`, itm)
  }

  deleteFlower(id: string) {
    return this.http.delete(`${this.BaseUrl}/${id}`)
  }

  updateFlower(id: string, itm: any) {
    return this.http.put(`${this.BaseUrl}/${id}`, itm)
  }
}
