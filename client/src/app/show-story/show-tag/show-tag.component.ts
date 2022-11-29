import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowStory } from 'src/app/_models/showstory';
import { Tags } from 'src/app/_models/tag';
import { StoryService } from 'src/app/_services/story.service';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-tag',
  templateUrl: './show-tag.component.html',
  styleUrls: ['./show-tag.component.scss'],

})
export class ShowTagComponent implements OnInit {
  @ViewChild('search',{static:true}) seachTerm:ElementRef;
  tagName:string;
  storylist:Partial<ShowStory[]>;
  tagArray;
  constructor(private showStoryService:ShowStoryService,
              private storyService:StoryService,
              private router:Router,
              private route:ActivatedRoute) { 
                
              }

  ngOnInit(): void {
    this.tagName = this.route.snapshot.params.tagname;
    this.loadstory(this.tagName);
    this.getAllTags();
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
      // console.log(this.storylist);
   })
  }
  getAllTags(){
    this.storyService.getAllTags()
         .subscribe( (res:Tags[]) => {
             this.tagArray = res.map(res => res.tagName);
         });
   }
   onSearch(){
    if(this.seachTerm.nativeElement.value)this.loadstory(this.seachTerm.nativeElement.value);
  }
}
