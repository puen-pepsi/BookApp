import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-follow-author',
  templateUrl: './follow-author.component.html',
  styleUrls: ['./follow-author.component.scss']
})
export class FollowAuthorComponent  {
  @Input() isActive:boolean;
  @Input() membername:string;
  @Input() user:User;
  @Output() follow = new EventEmitter<Object>()
  constructor() { }

  onClick(){
    this.isActive = !this.isActive;
    this.follow.emit({membername:this.membername,active:this.isActive});
  }

}
