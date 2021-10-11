import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Slide } from '../_models/slide.model';

@Injectable({
  providedIn: 'root'
})
export class Slide2Service {
  baseUrl = environment.apiUrl;
  formData : Slide = new Slide();
  list : Slide[]=[];
  constructor(private http:HttpClient) { }
  postphotoslide(){
    return this.http.post(this.baseUrl + 'photoslide2',this.formData);
  }
  putphotoslide(){
    return this.http.put(this.baseUrl + 'photoslide2/'+this.formData.id,this.formData);
  }
  deletephotoslide(id : number){
    return this.http.delete(this.baseUrl + 'photoslide2/'+ id);
  }
  getphotoslideAll(){
    return this.http.get<Slide[]>(this.baseUrl + 'photoslide2');
  }
  refreshList() {
    // this.formData
    this.http.get(this.baseUrl + 'photoslide2')
      .toPromise()
      .then(res => this.list = res as Slide[]); 
  }
}
