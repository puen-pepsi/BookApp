import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ChatService } from '../_services/chat.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-chatto',
  templateUrl: './chatto.component.html',
  styleUrls: ['./chatto.component.css']
})
export class ChattoComponent implements OnInit,OnDestroy {
 user:User;
 commentForm: FormGroup;
 groupname="openChat"
 
  constructor(public chatService : ChatService,
              private fb: FormBuilder,
              private accountService:AccountService,
              public presence:PresenceService) { 
                  this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
              }
  
 
  ngOnInit(): void {
    this.chatService.createHubConnection(this.user,"openChat");
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  } 
  onSubmit() {
    this.chatService.SendMessags(this.groupname,this.commentForm.value.content).then(()=>{
        this.commentForm.reset();
        
    })
  }
  ngOnDestroy(): void {
    this.chatService.stopHubConnection();
  }
}
