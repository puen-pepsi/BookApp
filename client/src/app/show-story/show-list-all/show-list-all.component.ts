import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadParams } from 'src/app/_models/lazyLoadParams';
import { Pagination } from 'src/app/_models/pagination';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryParams } from 'src/app/_models/storyParams';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-list-all',
  templateUrl: './show-list-all.component.html',
  styleUrls: ['./show-list-all.component.scss']
})
export class ShowListAllComponent implements OnInit {
  @Input() storyType : string;
  @ViewChild('search',{static:true}) seachTerm:ElementRef;

  storyTypeList = [{value:'novel',display:'Novel'},{value:'manga',display:'Manga'}]
  sortOptions = [
    {name: 'Rating', value: 'rating'},
    {name: 'Views', value: 'views'},
    {name: 'Create', value: 'created'},
  ]
  pagination :Pagination;
  storyParams : StoryParams;
  showstory : ShowStory[]=[];
  notEmptyPost = true;
  notscrolly = true;
  GenreList : any=[];
  LanguageList:any=[];
  lazyloadParams = new LazyLoadParams ;
  constructor(private showStoryService:ShowStoryService,
               private spinner: NgxSpinnerService,
              private route:ActivatedRoute
             ) {
              this.storyParams = this.showStoryService.getStoryParams(this.route.snapshot.params.storytype);
              // this.storyParams.storyType = this.route.snapshot.params.storytype;
  }

  ngOnInit(): void {
    //console.log(this.lazyloadParams)
    // if(this.storyType!=undefined){
    //   this.storyParams.storyType = this.storyType;
    // }
    this.getGenreList();
    this.getLanguageList();
    this.loadStory();
  }
  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      // this.spinner.show();
      this.notscrolly = false;
      this.lazyLoad();
    }
  }
  // loadStory(){
  //   this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
  //     this.showstory = res
  //     // console.log(res)
  //   });
  // }
  loadStory(){
    this.showStoryService.setStoryParams(this.storyParams);
    this.showStoryService.getShowStory(this.storyParams).subscribe(response => {
      this.showstory = response.result;
      this.pagination = response.pagination;
      console.log(this.showstory);
    });
  }
  lazyLoad(){
    //next page => page ++
    this.storyParams.pageNumber++;
    this.showStoryService.getShowStory(this.storyParams).subscribe(response => {
      const newpost = response.result;
      if(newpost.length ===0){
        this.notEmptyPost = false;
      }
      this.showstory = this.showstory.concat(newpost);
      this.pagination = response.pagination;
      this.notscrolly = true;
      // console.log(this.showstory);
    });

  }

  resetFilters(){
    this.seachTerm.nativeElement.value = '';
    this.storyParams = this.showStoryService.resetStoryParams();
    this.storyParams.storyType = this.route.snapshot.params.storytype;
    this.loadStory();
  }
  getGenreList(){
    this.showStoryService.getGenreList().subscribe(res =>{
      this.GenreList= [{id:0,description:'All'},...res]
    });
  }
  getLanguageList(){
    this.showStoryService.getLanguageList().subscribe(res =>{
      this.LanguageList= [{id:0,description:'All'},...res]
    });
  }
  onSearch(){
    this.storyParams.search = this.seachTerm.nativeElement.value;
    this.loadStory();
  }
  // pageChanged(event:any){
  //   console.log(event)

  //   this.showStoryService.setStoryParams(this.storyParams);
  //   // this.storyParams.pageNumber++;
  //   console.log(this.storyParams)
  //   console.log(this.pagination)
  //   //this.storyParams.pageNumber = event.page;
  //   this.storyParams.pageNumber=event.pageIndex+1;
  //   this.loadStory();
  // }

  onSortSelected(sort:string){
    this.notEmptyPost = true;
    this.storyParams.pageNumber =1;
    this.storyParams.orderBy = sort;
    this.loadStory();
  }
  onGenreSelected(genre: string) {
    this.notEmptyPost = true;
    this.storyParams.pageNumber =1;
    this.storyParams.genre = genre;
    this.loadStory();
  }
  onLanguageSelected(language:string){
    this.notEmptyPost = true;
    this.storyParams.pageNumber =1;
    this.storyParams.language = language;
    this.loadStory();
  }
  onTypeSelected(type: string) {
    this.notEmptyPost = true;
    this.storyParams.pageNumber =1;
    this.storyParams.storyType = type;
    this.loadStory();
  }


}
