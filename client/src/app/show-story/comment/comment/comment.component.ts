import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, ActivatedRoute } from '@angular/router';
import { StoryComment } from 'src/app/_models/storycomment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit{
  @Input() comments:StoryComment[];
  private storyName: string;

  commentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public commentService:CommentService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.storyName = this.route.snapshot.params.storyname;
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
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
    this.commentService.sendComment(this.storyName,this.commentForm.value.content,null).then(()=>{
        this.commentForm.reset();
        
    })
 }
}