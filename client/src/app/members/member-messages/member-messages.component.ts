import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  //changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit,AfterViewInit,OnDestroy{
  @ViewChild(CdkVirtualScrollViewport,{static: false})
   virtualScrollViewport: CdkVirtualScrollViewport;
  subscriptions = new Subscription();
  scrollToIndex$: Subject<void> = new Subject();
  @Input() messages: Message[];
  @Input() username: string;
  commentForm: FormGroup;
  user:User;
  //fix message
  //loading=false;
  constructor(public messageService:MessageService,
    private fb: FormBuilder,
    private accountService:AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }


  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: [''],
    });
    // this.subscriptions.add(
    //   this.scrollToIndex$
    //     .pipe(delay(0))
    //     .subscribe(() =>
    //       this.virtualScrollViewport.scrollTo({ bottom: 0, behavior: 'smooth' })
    //     )
    // );
  }
  ngAfterViewInit(): void {
    // this.virtualScrollViewport.scrollTo({bottom:0});
    this._scrollToBottom();
    // this.scrollToIndex$.next();

  }

  private _scrollToBottom() {
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
    }, 1000);
    setTimeout(() => {
      this.virtualScrollViewport.scrollTo({
        bottom: 0,
        behavior: 'smooth',
      });
    }, 2000);
  }
  sendMessage(){
    // this.loading=true;
    // this.messageService.sendMessage(this.username,this.messageContent).then(()=>{
    //   this.messageForm.reset();
    // })
    this.messageService.sendMessage(this.username,this.commentForm.value.content).then(()=>{
      this.commentForm.reset();
        this._scrollToBottom();
    })
    // }).finally(() => this.loading = false);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
