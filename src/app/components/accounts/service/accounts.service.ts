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

  getAllUsers(page: number, limit: number, searchName?: string) {
    let url = `${this.BaseUrl}?page=${page}&limit=${limit}`;
    if (searchName) url += `&search=${searchName}`;
    return this.http.get(url);
  }

  updateUserStatus(id: any, itm: any) {
    return this.http.patch(`${this.BaseUrl}/${id}`, itm)
  }
}
