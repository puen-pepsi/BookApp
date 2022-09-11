import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShowStoryService } from '../show-story/show-story.service';
import { LazyLoadParams } from '../_models/lazyLoadParams';
import { Pagination } from '../_models/pagination';
import { ShowStory } from '../_models/showstory';
import { slides } from '../_models/slides';
import { StoryParams } from '../_models/storyParams';
import { Slide2Service } from '../_services/slide2.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides:slides[]=[];
  topStory:Partial<ShowStory[]>;
  rateStory:Partial<ShowStory[]>;
  rateManga:Partial<ShowStory[]>;
  popStoryParams:StoryParams;
  pagination:Pagination;
  constructor(public showStoryService:ShowStoryService,
              private slide2Service:Slide2Service,) { 
    this.popStoryParams = this.showStoryService.getStoryParams('novel');
  }
  // showstoryM:Partial<ShowStory[]>= [];
  // lazyloadParams = new LazyLoadParams;
  ngOnInit(): void {
      this.loadSlideHome();
      
  }
  loadSlideHome(){
    this.slide2Service.getphotoslideAll().subscribe(res => {
      this.slides = res;
      this.loadStoryTopRank();
    })
  }
    loadStoryTopRank(){
    this.popStoryParams.orderBy = 'views';
    this.popStoryParams.pageSize = 5;
    this.showStoryService.setStoryParams(this.popStoryParams);
    this.showStoryService.getShowStory(this.popStoryParams).subscribe(response =>{
       this.topStory = response.result;
       this.pagination = response.pagination;
       this.loadStoryTopRate();
    })
  }
  loadStoryTopRate(){
    this.popStoryParams.orderBy ='rating';
    this.popStoryParams.pageSize = 10;
    this.showStoryService.setStoryParams(this.popStoryParams);
    this.showStoryService.getShowStory(this.popStoryParams).subscribe(response => {
      this.rateStory = response.result;
      this.pagination = response.pagination;
      this.loadMangaTopRate();
    })
  }
  loadMangaTopRate(){
    this.popStoryParams.storyType='manga';
    this.popStoryParams.orderBy = 'rating';
    this.popStoryParams.pageSize = 10;
    this.showStoryService.setStoryParams(this.popStoryParams);
    this.showStoryService.getShowStory(this.popStoryParams).subscribe(response => {
      this.rateManga = response.result;
      this.pagination = response.pagination;
    })
  }
  // loadStory(storytype:string){
  //   this.lazyloadParams.storyType = storytype;
  //   this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
  //     this.showstory = res
  //   });
  // }
  // loadStoryManga(storytype:string){
  //   this.lazyloadParams.storyType = storytype;
  //   this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
  //     this.showstoryM = res
  //   });
  // }

}
