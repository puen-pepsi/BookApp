import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, map, pairwise, take, throttleTime } from 'rxjs/operators';
import { ChatMessage } from '../_models/Chatmessage';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ChatService } from '../_services/chat.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-chatto',
  templateUrl: './chatto.component.html',
  styleUrls: ['./chatto.component.scss'],
})
export class ChattoComponent implements OnInit,OnDestroy,AfterViewInit{
  @ViewChild(CdkVirtualScrollViewport)
  public virtualScrollViewport?: CdkVirtualScrollViewport;
  // @ViewChild('scroller') scroller:CdkVirtualScrollViewport;
  chatList:ChatMessage[]=[];
  subscriptions = new Subscription();
  user:User;
 commentForm: FormGroup;
 groupname="openChat"
 theme:string;
 submiting:boolean = false;
 loading=false;
 isShowButton = false
  constructor(public chatService : ChatService,
              private fb: FormBuilder,
              private accountService:AccountService,
              public presence:PresenceService,
              private ngZone:NgZone) { 
                  this.accountService.currentUser$.pipe(take(1))
                    .subscribe(user => this.user = user);
                  this.subscriptions = this.chatService.commentThread$.subscribe( data => {
                      if(this.chatList.length > 0){
                        if(this.chatList.slice(-1)[0].id < data.slice(-1)[0].id){
                          this._scrollToBottom()
                        }
                      }
                      this.chatList = data;
                      
                  })
              }

  ngAfterViewInit(): void {
    this._scrollToBottom();
    this.virtualScrollViewport.elementScrolled().pipe(
      map(()=> this.virtualScrollViewport.measureScrollOffset('top')),
      pairwise(),
      filter(([y1,y2])=>(y2 < y1 && y2 < 70)),
      throttleTime(200)
    ).subscribe(()=>{
      this.ngZone.run(()=>{
        this.loadMore();
      })
    })
    this.virtualScrollViewport.elementScrolled().pipe(
      map(()=> this.virtualScrollViewport.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1,y2])=>(y2 > y1 && y2 < 100)),
      throttleTime(200)
    ).subscribe(()=>{
      // console.log("GotoBottom")
      this.isShowButton = true;
    })
    this.virtualScrollViewport.elementScrolled().pipe(
      map(()=> this.virtualScrollViewport.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1,y2])=>(y2 < y1 && y2 < 100)),
      throttleTime(200)
    ).subscribe(()=>{
      // console.log("GotoBottom")
      this.isShowButton = false;
    })
  }

  ngOnInit(): void {
    this.chatService.createHubConnection(this.user,"openChat");
    this.commentForm = this.fb.group({
      content: ['',[Validators.required]],
    });
  } 

    _scrollToBottom() {
      setTimeout(() => {
        this.virtualScrollViewport.scrollTo({
          bottom: 10,
          behavior: 'smooth',
        });
      }, 2000);
      setTimeout(() => {
        this.virtualScrollViewport.scrollTo({
          bottom: 10,
          behavior: 'smooth',
        });
      }, 3000);
    }
  loadMore(){
    this.loading = true;
    this.chatService.MoreMessags("openChat",this.chatList.length).then(() =>{
        setTimeout(()=>{
          this.loading = false;
          this.virtualScrollViewport.scrollToIndex(10,'smooth');
        },2000)
    });
  }
  onSubmit() {
    this.submiting = true;
      this.chatService.SendMessages(this.groupname,this.commentForm.value.content).then(()=>{
        this.commentForm.reset();
        this.submiting = false;
        this._scrollToBottom();
      })
    
  }
  trackByFn(index,item){
    return item.id;
  }
  ngOnDestroy(): void {
    this.chatService.stopHubConnection();
    this.subscriptions.unsubscribe();
  }
}
