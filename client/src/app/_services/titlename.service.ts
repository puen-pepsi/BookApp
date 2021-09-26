import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { TitleName } from '../_models/titlename.model';

@Injectable({
  providedIn: 'root'
})
export class TitlenameService {
  baseUrl = environment.apiUrl ;
  formData : TitleName = new TitleName();
  list : TitleName[];
  constructor(private http:HttpClient) { }
  posttitlename(){
    return this.http.post(this.baseUrl + 'titlename',this.formData);
  }
  puttitlename(){
    return this.http.put(this.baseUrl + 'titlename/'+ this.formData.id, this.formData);
  }
  deletetitlename(id:number){
    return this.http.delete(this.baseUrl + 'titlename/' + id);
  }
  refreshList() {
    this.http.get<TitleName[]>(this.baseUrl + 'titlename')
      .toPromise()
      .then(res => this.list = res as TitleName[]);
  }

  getAlltitlename(){
    return this.http.get<TitleName[]>(this.baseUrl + 'titlename');
  }
}
