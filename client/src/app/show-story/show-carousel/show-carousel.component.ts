import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadParams } from 'src/app/_models/lazyLoadParams';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-carousel',
  templateUrl: './show-carousel.component.html',
  styleUrls: ['./show-carousel.component.scss']
})
export class ShowCarouselComponent implements OnInit {
  @Input() storyType:string;
  showstory:Partial<ShowStory[]>;
  lazyloadParams = new LazyLoadParams;
  // imagesForSlider = [
  //   {path: '../../assets/images/slice1.png'},
  //   {path: '../../assets/images/slice2.png'},
  //   {path: '../../assets/images/slice3.png'},
  //   {path: '../../assets/images/slice4.png'},
  //   {path: '../../assets/images/slice5.png'},
  //   {path: '../../assets/images/slice6.png'},
  // ];
  constructor(private showStoryService:ShowStoryService) { }

  ngOnInit(): void {
    this.lazyloadParams.storyType = this.storyType;
    this.loadStory(this.storyType);
  }
  loadStory(storytype:string){
    this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
      this.showstory = res
    });
  }
}
