import { Component, OnInit, Input  } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { StoryComment } from 'src/app/_models/storycomment';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit{
  @Input() comments:StoryComment[];
  @Input() commentChapter:number;
  private storyName: string;
  activitiesType = ActivitiesType.writeComment;
  activitiesTimer = true;
  username:string;
  commentForm: UntypedFormGroup;
  commentlist:StoryComment[]=[];
  commentSub :Subscription;
  constructor(
    private fb: UntypedFormBuilder,
    public commentService:CommentService,
    private activitiesService:ActivitiesService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.storyName = this.route.snapshot.params.storyname;
    this.commentForm = this.fb.group({
      content: [''],
    });
    
    this.username = this.commentService.user.username;
  }

  onCommentCancel() {
    this.commentForm.reset();
  }

  onSubmit() {
    // const data = {
      
    //   storyName: this.storyName,
    //   content: this.commentForm.value.content,
    //   // parentId: 
    // }
    // this.commentService.addComment(data).subscribe(comment => {
    //     this.comments.push(comment);
    //     this.commentForm.reset();
    // });
    //console.log(event);
    this.commentService.sendComment(this.storyName,this.commentForm.value.content,null,this.commentChapter).then(()=>{
        this.commentForm.reset();
        if(this.activitiesTimer){
          this.activitiesService.postActivities(this.activitiesType,this.storyName).subscribe(res =>{
            console.log(res)
            this.activitiesTimer = false;
            setTimeout(() => {
              this.activitiesTimer = true;
            }, 300000);
          })
        }
        
    })
    
 }
}