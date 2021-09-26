import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cover } from '../_models/cover.model';

@Injectable({
  providedIn: 'root'
})
export class CoverService {
  baseUrl = environment.apiUrl;
  formData : Cover = new Cover();
  list : Cover[]=[];
  constructor(private http:HttpClient) { }
  postphotoscreen(){
    return this.http.post(this.baseUrl + 'photoscreen',this.formData);
  }
  putphotoscreen(){
    return this.http.put(this.baseUrl + 'photoscreen/'+this.formData.id,this.formData);
  }
  deletephotoscreen(id : number){
    return this.http.delete(this.baseUrl + 'photoscreen/'+ id);
  }
  getphotoscreenAll(){
    return this.http.get<Cover[]>(this.baseUrl + 'photoscreen');
  }
  refreshList() {
    // this.formData
    this.http.get(this.baseUrl + 'photoscreen')
      .toPromise()
      .then(res => this.list = res as Cover[]); 
  }
  getRandom(){
     return this.http.get<Cover>(this.baseUrl + 'photoscreen/random');
  }
}
