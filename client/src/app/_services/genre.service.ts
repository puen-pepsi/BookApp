import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genres } from '../_models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  baseUrl = environment.apiUrl ;
  formData : Genres = new Genres();
  list : Genres[];
  constructor(private http:HttpClient) { }

  postGenre(){
    return this.http.post(this.baseUrl + 'Genre',this.formData);
  }
  putGenre(){
    return this.http.put(this.baseUrl + 'Genre/'+ this.formData.id, this.formData);
  }
  deleteGenre(id:number){
    return this.http.delete(this.baseUrl + 'Genre/' + id);
  }
  refreshList() {
    this.http.get(this.baseUrl + 'Genre')
      .toPromise()
      .then(res => this.list = res as Genres[]);
  }
}
