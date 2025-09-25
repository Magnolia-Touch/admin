import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BaseUrl = `${environment.apiUrl}/auth`

  constructor(
    private http: HttpClient
  ) { }

  getProfile() {
    return this.http.get(`${this.BaseUrl}/profile`)
  }

  updateProfile(itm: any) {
    return this.http.put(`${this.BaseUrl}/profile`, itm)
  }

  createAdmin(itm: any) {
    return this.http.post(`${this.BaseUrl}/adminregister`, itm);
  }

}
