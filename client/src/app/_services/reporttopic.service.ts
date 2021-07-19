import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportTopic } from '../_models/reporttopic';

@Injectable({
  providedIn: 'root'
})
export class ReporttopicService {
  baseUrl = environment.apiUrl ;
  formData : ReportTopic = new ReportTopic();
  list : ReportTopic[];
  constructor(private http:HttpClient) { }

  postTags(){
    return this.http.post(this.baseUrl + 'reporttopic',this.formData);
  }
  putTags(){
    return this.http.put(this.baseUrl + 'reporttopic/'+ this.formData.id, this.formData);
  }
  deleteTags(id:number){
    return this.http.delete(this.baseUrl + 'reporttopic/' + id);
  }
  refreshList() {
    this.http.get(this.baseUrl + 'reporttopic')
      .toPromise()
      .then(res => this.list = res as ReportTopic[]);
  }
}
