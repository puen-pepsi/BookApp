import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-follow-author',
  templateUrl: './follow-author.component.html',
  styleUrls: ['./follow-author.component.scss']
})
export class FollowAuthorComponent  {
  @Input() isActive:boolean;
  @Input() membername:string;
  @Output() follow = new EventEmitter<Object>()
  constructor() { }

  onClick(){
    this.isActive = !this.isActive;
    this.follow.emit({membername:this.membername,active:this.isActive});
  }

}
