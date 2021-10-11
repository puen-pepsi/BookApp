import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Slide } from '../_models/slide.model';

@Injectable({
  providedIn: 'root'
})
export class BannerDialogService {
  baseUrl = environment.apiUrl;
  formData : Slide = new Slide();
  list : Slide[]=[];
  constructor(private http:HttpClient) { }
  postphotobannerdialog(){
    return this.http.post(this.baseUrl + 'photobannerdialog',this.formData);
  }
  putphotobannerdialog(){
    return this.http.put(this.baseUrl + 'photobannerdialog/'+this.formData.id,this.formData);
  }
  deletephotobannerdialog(id : number){
    return this.http.delete(this.baseUrl + 'photobannerdialog/'+ id);
  }
  getphotobannerdialogAll(){
    return this.http.get<Slide[]>(this.baseUrl + 'photobannerdialog');
  }
  getphotobannerdialogId(id:number){
    return this.http.get<Slide>(this.baseUrl + 'photobannerdialog/'+ id);
  }
  refreshList() {
    // this.formData
    this.http.get(this.baseUrl + 'photobannerdialog')
      .toPromise()
      .then(res => this.list = res as Slide[]); 
  }
}
