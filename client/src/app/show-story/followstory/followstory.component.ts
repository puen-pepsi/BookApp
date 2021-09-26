import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-followstory',
  templateUrl: './followstory.component.html',
  styleUrls: ['./followstory.component.scss']
})
export class FollowstoryComponent{
  @Input() isActive:boolean;
  @Input() storyid:number;
  @Input() storyname:string;
  @Output() follow = new EventEmitter<Object>()
  constructor() { }
  onClick(){
    this.isActive = !this.isActive;
    this.follow.emit({storyid:this.storyid,storyname:this.storyname,active:this.isActive});
  }

}
