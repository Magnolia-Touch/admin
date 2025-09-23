import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private BaseUrl = `${environment.apiUrl}/auth/users`

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(page?: any, limit?: any) {
    return this.http.get(`${this.BaseUrl}?page=${page}&limit=${limit}`)
  }
}
