import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';

@Component({
  selector: 'app-followstory',
  templateUrl: './followstory.component.html',
  styleUrls: ['./followstory.component.scss']
})
export class FollowstoryComponent{
  // @Input() isActive:boolean;
  // @Input() storyid:number;
  // @Input() storyname:string;
  @Input() story:ShowStory;
  @Output() follow = new EventEmitter<ShowStory>()
  // @Output() follow = new EventEmitter<Object>()
  constructor() { }
  onClick(){
    this.story.liked = !this.story.liked;
    // this.follow.emit({storyid:this.storyid,storyname:this.storyname,active:this.isActive});
    this.follow.emit(this.story);
  }

}
