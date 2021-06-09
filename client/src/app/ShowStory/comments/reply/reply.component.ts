import { Input, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  replyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private replyService: ReplyService
    ) {}


  ngOnInit() {

    this.replyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
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
      name: this.replyForm.value.name,
      email: this.replyForm.value.email,
      message: this.replyForm.value.message,
      comment: this.commentId,
      postDate: Date.now()
    }

    // this.replyService.addReply(submittedVal);
  }
}
