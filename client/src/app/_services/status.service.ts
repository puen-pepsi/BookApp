import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from '../_models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  baseUrl = environment.apiUrl ;
  formData : Status = new Status();
  list : Status[];
  constructor(private http:HttpClient) { }

  postStatus(){
    return this.http.post(this.baseUrl + 'statuses',this.formData);
  }
  putStatus(){
    return this.http.put(this.baseUrl + 'statuses/'+ this.formData.id, this.formData);
  }
  deleteStatus(id:number){
    return this.http.delete(this.baseUrl + 'statuses/' + id);
  }
  refreshList() {
    this.http.get(this.baseUrl + 'statuses')
      .toPromise()
      .then(res => this.list = res as Status[]);
  }
}
