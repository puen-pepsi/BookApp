// import { Comment } from './../comment.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoryComment } from 'src/app/_models/storycomment';
import { CommentService } from 'src/app/_services/comment.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { ShowStoryService } from '../../show-story.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit, OnDestroy ,OnChanges{
   @Input() commentChapter:number;
   commentlist:StoryComment[]=[];
  // @ViewChild('scroller') scroller:CdkVirtualScrollViewport;
  storyName: string;
  showReply = false;
  togglePanel: any = {};
  commentSub: Subscription;
  
  constructor(
    public commentService:CommentService,
    private route: ActivatedRoute,
    private router:Router,
    private confirmService:ConfirmService,
    private showService : ShowStoryService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.commentChapter)
    this.commentSub = this.commentService.commentThread$.subscribe(comments =>{
      this.commentlist = comments.filter(comment=> comment.chapterId == this.commentChapter 
              && comment.parentId == null);
      console.log(this.commentlist)
      //story comment => chapter == null && parentId = null
  })

  }
  // ngAfterViewInit(): void {
  //   this.scroller.elementScrolled().pipe(
  //     map(() => this.scroller.measureScrollOffset('bottom')),
  //     pairwise(),
  //     filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
  //     throttleTime(200)
  //   ).subscribe(() => {
  //     this.ngZone.run(() => {
  //       console.log("Get Data")
  //     });
  //   }
  //   );
  // }
    
  ngOnInit() {
    this.storyName = this.route.snapshot.params.storyname;
    // this.commentService.getComments(this.storyName);

    // this.commentSub = this.commentService.getComments(this.storyName)
    //   .subscribe((commentList: StoryComment[]) => {
    //     this.comments = commentList;
    //   });
    
    // this.commentSub =  this.commentService.commentThread$.subscribe(comments => {
    //         this.commentChapter > 0?
    //           this.commentlist = comments.filter(comment => comment.chapterId == this.commentChapter):
    //           this.commentlist = comments.filter(comment => comment.chapterId == null);
    //         console.log(this.commentlist)
    //   });
    console.log(this.commentChapter)

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
  onReport(event:any){
    this.showService.postReport(event).subscribe(res => {
      console.log(res)
    })
  }
  gotoMember(event){
    this.router.navigate(['/members',event]);
  }
  ngOnDestroy() {
    this.commentSub.unsubscribe();
  }
}
