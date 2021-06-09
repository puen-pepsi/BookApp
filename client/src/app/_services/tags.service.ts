import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tags } from '../_models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  baseUrl = environment.apiUrl ;
  formData : Tags =new Tags();
  list : Tags[];
  constructor(private http:HttpClient) { }

  postTags(){
    return this.http.post(this.baseUrl + 'tags',this.formData);
  }
  putTags(){
    return this.http.put(this.baseUrl + 'tags/'+ this.formData.id, this.formData);
  }
  deleteTags(id:number){
    return this.http.delete(this.baseUrl + 'tags/' + id);
  }
  refreshList() {
    this.http.get(this.baseUrl + 'tags')
      .toPromise()
      .then(res => this.list = res as Tags[]);
  }
  
}
