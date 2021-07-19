// import { Comment } from './../comment.model';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/_services/comment.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { ShowStoryService } from '../../show-story.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit, OnDestroy {
   @Input() commentChapter:number;

  storyName: string;
  showReply = false;
  togglePanel: any = {};
  commentSub: Subscription;

  constructor(
    public commentService:CommentService,
    private route: ActivatedRoute,
    private confirmService:ConfirmService,
    private showService : ShowStoryService,
  ) {}
    
  ngOnInit() {
    this.storyName = this.route.snapshot.params.storyname;
    // this.commentService.getComments(this.storyName);

    // this.commentSub = this.commentService.getComments(this.storyName)
    //   .subscribe((commentList: StoryComment[]) => {
    //     this.comments = commentList;
    //   });
  }

  onDeleteComment(id) {
    //  this.commentService.deleteComment(id, this.postId);
    this.confirmService.confirm('Confirm delete message','This cannot be undone').subscribe(result =>{
      if(result) {
          this.commentService.deleteComment(id,this.storyName).catch(error=>console.log(error));
          // this.messages.splice(this.messages.findIndex(m=>m.id===id),1); 
        }
      })
  }

  onReply(){
    this.showReply = (!this.showReply) ? true : false;
  }
  addLike(commentid:number){
    this.commentService.addLikedComment(commentid).subscribe(res =>{
      console.log(res);
    });
  }
  onReport(event){
    this.showService.postReport(event).subscribe(res => {
      console.log(res)
    })
  }
  ngOnDestroy() {
    // this.commentSub.unsubscribe();
  }
}
