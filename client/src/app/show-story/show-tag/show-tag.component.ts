import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-tag',
  templateUrl: './show-tag.component.html',
  styleUrls: ['./show-tag.component.scss'],

})
export class ShowTagComponent implements OnInit {
  tagName:string;
  storylist:Partial<ShowStory[]>;
  constructor(private showStoryService:ShowStoryService,
              private router:Router,
              private route:ActivatedRoute) { 
                
              }

  ngOnInit(): void {
    this.tagName = this.route.snapshot.params.tagname;
    this.loadstory(this.tagName);
  }
  tagchange(event){
    this.loadstory(event)
  }
  showStory(storyname:string){
    this.router.navigate(['/stories',storyname]);
  }
  loadstory(tagname:string){
    this.showStoryService.getStoryTag(tagname).subscribe(res =>{
      this.storylist = res;
      this.tagName = tagname;
   })
  }
}
