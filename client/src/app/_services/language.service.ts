import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../_models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  baseUrl = environment.apiUrl ;
  formData : Language = new Language();
  list : Language[];
  constructor(private http:HttpClient) { }
  postLanguage(){
    return this.http.post(this.baseUrl + 'Language',this.formData);
  }
  putLanguage(){
    return this.http.put(this.baseUrl + 'Language/'+ this.formData.id, this.formData);
  }
  deleteLanguage(id:number){
    return this.http.delete(this.baseUrl + 'Language/' + id);
  }
  refreshList() {
    this.http.get(this.baseUrl + 'Language')
      .toPromise()
      .then(res => this.list = res as Language[]);
  }
}
