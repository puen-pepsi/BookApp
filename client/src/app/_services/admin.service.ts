import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { VipUser } from '../_models/vipuser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  getUserRoles(username:string){
    return this.http.get<Partial<User>>(this.baseUrl + 'admin/user-with-roles/'+username);
  }
  getUserWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username,roles){
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username +'?roles=' + roles,{});
  }
  getVipForUser(username){
    return this.http.post(this.baseUrl + 'admin/add-vip-role/' + username,{});
  }
  getExpiredUser(username){
    return this.http.get<Date>(this.baseUrl + 'admin/get-vip-expired/' + username);
  }
  getAllVipUser(){
    return this.http.get<VipUser[]>(this.baseUrl + 'vipuser');
  }
}
