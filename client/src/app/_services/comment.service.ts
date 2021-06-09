import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StoryComment } from '../_models/storycomment';
import {BehaviorSubject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../_models/user';
import { Group } from '../_models/group';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection : HubConnection;
  private commentThreadSource = new BehaviorSubject<StoryComment[]>([]);
  commentThread$ = this.commentThreadSource.asObservable();

  constructor(private http:HttpClient) { }

  createHubConnection(user: User, storyName: string) {
    // this.busyService.busy();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'comment?storyname=' + storyName, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start().catch(error => console.log(error));
    // this.hubConnection.start()
    //   .catch(error => console.log(error))
    //   .finally(() => this.busyService.idle());

    this.hubConnection.on('ReceiveComments', comments => {
      this.commentThreadSource.next(comments);
    })

    this.hubConnection.on('NewComment', comment => {
      this.commentThread$.pipe(take(1)).subscribe(comments => {
        console.log(comment)
        this.commentThreadSource.next([...comments, comment])
      })
    })

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some(x => x.username === storyName)) {
        this.commentThread$.pipe(take(1)).subscribe(comments => {
          // messages.forEach(message => {
          //   if (!message.dateRead) {
          //     message.dateRead = new Date(Date.now())
          //   }
          // })
          this.commentThreadSource.next([...comments]);
        })
      }
    })
  }
  stopHubConnection() {
    if (this.hubConnection) {
      //Add fixMessage
      // this.messageThreadSource.next([]);
      this.hubConnection.stop();
    }
  }

  addComment(data){
    return this.http.post<StoryComment>(this.baseUrl + 'comments/' + data.storyName,data); 
  }
   async sendComment(storyname:string,content:string){
    return this.hubConnection.invoke('SendComment',{storyname,content})
        .catch(error=> console.log(error));
  }
  getComments(storyName:string){
    return this.http.get<StoryComment[]>(this.baseUrl +'comments/' + storyName);
  }
 
  
}
