import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/_services/comment.service';
import { ConfirmService } from 'src/app/_services/confirm.service';


@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit, OnDestroy {
  @Input('commentId') commentId: string;
  @Input('storyName') storyname:string;
  replies;
  showReply = false;
  togglePanel: any = {};
  replySub: Subscription;

  constructor(
    public commentService:CommentService,
    private confirmService:ConfirmService
  ) {}

  ngOnInit() {

    //this.replyService.getReply(this.commentId);
    // this.replyService.getAllReply();


    // this.replySub = this.replyService.getReplyUpdateListener()
    //   .subscribe((replyList: Reply[]) => {
    //     this.replies = replyList;
    //     console.log(this.replies);
    //   });
  }

  onDeleteComment(id) {
    //  this.commentService.deleteComment(id, this.postId);
    this.confirmService.confirm('Confirm delete message','This cannot be undone').subscribe(result =>{
      if(result) {
          this.commentService.deleteComment(id,this.storyname).catch(error=>console.log(error));
          // this.messages.splice(this.messages.findIndex(m=>m.id===id),1); 
        }
      })
  }
  onReply(){
    this.showReply = (!this.showReply) ? true : false;
  }
  addLike(commentid:number){
    this.commentService.addLikedComment(commentid).subscribe( res =>{
      console.log(res);
    });
  }
  ngOnDestroy() {
    // this.replySub.unsubscribe();
  }


}