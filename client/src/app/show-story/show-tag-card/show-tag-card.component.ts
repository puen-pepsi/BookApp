import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ShowStory } from 'src/app/_models/showstory';

@Component({
  selector: 'app-show-tag-card',
  templateUrl: './show-tag-card.component.html',
  styleUrls: ['./show-tag-card.component.scss']
})
export class ShowTagCardComponent implements OnInit {
@Input() story:ShowStory;
@Output() tagchange = new EventEmitter();
@Output() showStory = new EventEmitter();
tag:string[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.tag = this.story.tags.split(",");
  }
  goToTag(ele :string){
    // this.router.navigate(['stories/tag',ele]);
    this.tagchange.emit(ele);
  }
  goToStory(story){
    this.showStory.emit(story);
  }
}
