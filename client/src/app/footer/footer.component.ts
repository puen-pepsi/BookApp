import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from '../_models/tag';
import { StoryService } from '../_services/story.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() footerlogo:string;
  @Input() bgtool:string;
  tagArray;
  constructor(private storyService:StoryService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllTags();
  }
  getAllTags(){
    this.storyService.getAllTags()
         .subscribe( (res:Tags[]) => {
             this.tagArray = res.map(res => res.tagName);
         });
   }
   tagchange(tag:string){
      this.router.navigate(['/stories/tag',tag.toLowerCase()]);
   }
   logoClick(event){
    this.router.navigate(["/"]);
  }  
}
