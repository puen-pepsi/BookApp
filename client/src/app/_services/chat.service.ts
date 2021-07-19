import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../_models/Chatmessage';
import { Group } from '../_models/group';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection : HubConnection;
  private commentThreadSource = new BehaviorSubject<ChatMessage[]>([]);
  commentThread$ = this.commentThreadSource.asObservable();
  user:User;
  constructor(private http:HttpClient,private accountService:AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
    })
  }
  createHubConnection(user: User, groupname: string) {
    // this.busyService.busy();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'chat?groupname=' + groupname, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start().catch(error => console.log(error));
    // this.hubConnection.start()
    //   .catch(error => console.log(error))
    //   .finally(() => this.busyService.idle());

    this.hubConnection.on('ReceiveChatMessage', comments => {
      this.commentThreadSource.next([...comments]);
    })
    
    this.hubConnection.on('NewChatMessage', comment => {
      this.commentThread$.pipe(take(1)).subscribe(comments => {
        //console.log(comment)
        this.commentThreadSource.next([...comments,comment])
      })
    })
    this.hubConnection.on('DeleteChatMessage', comment => {
      this.commentThread$.pipe(take(1)).subscribe(comments => {
        comments = comments.filter(comments => comments.id != comment.id);     
        this.commentThreadSource.next([...comments].reverse());
      })
    })
    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some(x => x.username === groupname)) {
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


  async SendMessags(groupname:string,content:string){
    return this.hubConnection.invoke('SendMessags',{groupname,content})
        .catch(error=> console.log(error));
  }
  
 
  
}
