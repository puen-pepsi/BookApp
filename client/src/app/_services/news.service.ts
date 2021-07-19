import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News } from '../_models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseUrl = environment.apiUrl;
  formData : News = new News();
  list : News[]=[];
  constructor(private http:HttpClient) { }
  postNews(){
    return this.http.post(this.baseUrl + 'News',this.formData);
  }
  putNews(){
    return this.http.put(this.baseUrl + 'News/'+this.formData.id,this.formData);
  }
  deleteNews(id : number){
    return this.http.delete(this.baseUrl + 'News/'+ id);
  }
  getNewsAll(){
    return this.http.get<News[]>(this.baseUrl + 'News');
  }
  refreshList() {
    // this.formData
    this.http.get(this.baseUrl + 'News')
      .toPromise()
      .then(res => this.list = res as News[]);
  }
}
