import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ChatService } from '../_services/chat.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-chatto',
  templateUrl: './chatto.component.html',
  styleUrls: ['./chatto.component.scss']
})
export class ChattoComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport)
  public virtualScrollViewport?: CdkVirtualScrollViewport;
 user:User;
 commentForm: UntypedFormGroup;
 groupname="openChat"
 notEmptyPost = true;
 notscrolly = true;
 theme:string;
 submiting:boolean = false;

  constructor(public chatService : ChatService,
              private fb: UntypedFormBuilder,
              private accountService:AccountService,
              public presence:PresenceService) { 
                  this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
              }

  ngAfterViewInit(): void {
    // this.virtualScrollViewport.scrollTo({bottom:0});
    this._scrollToBottom();
  }

  ngOnInit(): void {
    this.chatService.createHubConnection(this.user,"openChat");
    this.commentForm = this.fb.group({
      content: ['',[Validators.required]],
    });
  } 
  loadNext(){
    //this.chatService.commentThread$.
  }
  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      console.log("scroll")
      //this.loadNextPost();
     }
    }
    _scrollToBottom() {
      // I use setTimeout because this has to be executed after the view has rendered the elements
      // setTimeout(
      //   () =>
      //     this.virtualScrollViewport.scrollTo({
      //       bottom: -10,
      //       behavior: 'smooth',
      //     }),
      //   1000
      // );

      setTimeout(() => {
        this.virtualScrollViewport.scrollTo({
          bottom: 0,
          behavior: 'smooth',
        });
      }, 2000);
      setTimeout(() => {
        this.virtualScrollViewport.scrollTo({
          bottom: 0,
          behavior: 'smooth',
        });
      }, 3000);

    }
  onSubmit() {
    this.submiting = true;
      this.chatService.SendMessags(this.groupname,this.commentForm.value.content).then(()=>{
        this.commentForm.reset();
        this._scrollToBottom();
        this.submiting = false;
      })
    
  }

  ngOnDestroy(): void {
    this.chatService.stopHubConnection();
  }
}
