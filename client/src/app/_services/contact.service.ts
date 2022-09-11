import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  PostMessage(input: any) {
    return this.http.post(this.baseUrl + 'contact',input)
      
  }
}
