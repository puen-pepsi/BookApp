import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent{
  @Input('likeCount') likeCount:number;
  @Input('isActive') isActive:boolean;
  @Output() commentId = new EventEmitter
  onClick(){
    this.likeCount += (this.isActive)?-1:+1;
    this.isActive = !this.isActive;
    this.commentId.emit();
  }
}
