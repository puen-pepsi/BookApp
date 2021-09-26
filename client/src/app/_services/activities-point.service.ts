import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivitiesPoint } from '../_models/activitiespoint.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesPointService {
  baseUrl = environment.apiUrl ;
  formData : ActivitiesPoint = new ActivitiesPoint();
  list : ActivitiesPoint[];
  constructor(private http:HttpClient) { }
  postActivitiesPoint(){
    return this.http.post(this.baseUrl + 'point',this.formData);
  }
  putActivitiesPoint(){
    return this.http.put(this.baseUrl + 'point/'+ this.formData.id, this.formData);
  }
  deleteActivitiesPoint(id:number){
    return this.http.delete(this.baseUrl + 'point/' + id);
  }
  refreshList() {
    this.http.get<ActivitiesPoint[]>(this.baseUrl + 'point')
      .toPromise()
      .then(res => this.list = res as ActivitiesPoint[]);
  }

  getAllActivitiesPoint(){
    return this.http.get<ActivitiesPoint[]>(this.baseUrl + 'point');
  }
}
