import { Input, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/_services/comment.service';
// import { ReplyService } from '../../reply.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Output('repCancel') repCancel: boolean;
  @Input('commentId') commentId: string;
  @Input('replyId') replyId: string;
  @Input('storyName') storyname:string;
  replyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public commentService:CommentService,
    ){}


  ngOnInit() {

    this.replyForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  get cId() {
    return this.commentId;
  }
  onReplyCancel() {
     // this.repCancel = false;

   // this.replyForm.reset();
  }

  onSubmit() {
    const submittedVal = {
      content: this.replyForm.value.content,
      comment: this.commentId,
      story_name:this.storyname
    }
    console.log(submittedVal);
    this.commentService.sendComment(submittedVal.story_name,submittedVal.content,+submittedVal.comment,null).then(()=>{
      this.replyForm.reset();
      
  })
  }
}
