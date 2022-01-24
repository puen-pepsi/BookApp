import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShowStoryService } from '../show-story/show-story.service';
import { LazyLoadParams } from '../_models/lazyLoadParams';
import { ShowStory } from '../_models/showstory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // imagesForSlider = [
  //   {path: '../../assets/images/slice1.png'},
  //   {path: '../../assets/images/slice2.png'},
  //   {path: '../../assets/images/slice3.png'},
  //   {path: '../../assets/images/slice4.png'},
  //   {path: '../../assets/images/slice5.png'},
  //   {path: '../../assets/images/slice6.png'},
  // ];
  constructor(private showStoryService:ShowStoryService) { }
  showstory:Partial<ShowStory[]> = [];
  showstoryM:Partial<ShowStory[]>= [];
  lazyloadParams = new LazyLoadParams;
  ngOnInit(): void {
      this.loadStory("novel");
      this.loadStoryManga("manga");
  }
  loadStory(storytype:string){
    this.lazyloadParams.storyType = storytype;
    this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
      this.showstory = res
    });
  }
  loadStoryManga(storytype:string){
    this.lazyloadParams.storyType = storytype;
    this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
      this.showstoryM = res
    });
  }
}
