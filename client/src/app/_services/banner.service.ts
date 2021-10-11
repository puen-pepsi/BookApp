import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Slide } from '../_models/slide.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  baseUrl = environment.apiUrl;
  formData : Slide = new Slide();
  list : Slide[]=[];
  constructor(private http:HttpClient) { }
  postphotobanner(){
    return this.http.post(this.baseUrl + 'photobanner',this.formData);
  }
  putphotobanner(){
    return this.http.put(this.baseUrl + 'photobanner/'+this.formData.id,this.formData);
  }
  deletephotobanner(id : number){
    return this.http.delete(this.baseUrl + 'photobanner/'+ id);
  }
  getphotobannerAll(){
    return this.http.get<Slide[]>(this.baseUrl + 'photobanner');
  }
  getphotobannerId(id : number){
    return this.http.get<Slide>(this.baseUrl + 'photobanner/' + id );
  }
  refreshList() {
    // this.formData
    this.http.get(this.baseUrl + 'photobanner')
      .toPromise()
      .then(res => this.list = res as Slide[]); 
  }
}
