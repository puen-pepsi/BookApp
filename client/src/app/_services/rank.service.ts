import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rank } from '../_models/rank.model';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  baseUrl = environment.apiUrl ;
  formData : Rank = new Rank();
  list : Rank[];
  constructor(private http:HttpClient) { }
  postRank(){
    return this.http.post(this.baseUrl + 'rank',this.formData);
  }
  putRank(){
    return this.http.put(this.baseUrl + 'rank/'+ this.formData.id, this.formData);
  }
  deleteRank(id:number){
    return this.http.delete(this.baseUrl + 'rank/' + id);
  }
  refreshList() {
    this.http.get<Rank[]>(this.baseUrl + 'rank')
      .toPromise()
      .then(res => this.list = res as Rank[]);
  }

  getAllRank(){
    return this.http.get<Rank[]>(this.baseUrl + 'rank');
  }
}
