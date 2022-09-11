import {  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryParams } from 'src/app/_models/storyParams';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit,OnDestroy {
  @Input() storyType : string;
  @Output() headlogo = new EventEmitter();
  @ViewChild('search',{static:true}) seachTerm:ElementRef;
  random :boolean = false;
  showstory : ShowStory[]=[];
  GenreList : any=[];
  LanguageList:any=[];
  pagination :Pagination;
  storyParams : StoryParams;
  storyTypeList = [{value:'novel',display:'Novel'},{value:'manga',display:'Manga'}]
  sortOptions = [
    {name: 'Rating', value: 'rating'},
    {name: 'Views', value: 'views'},
    {name: 'Create', value: 'created'},
  ]
  // obs: Observable<any>;
  // dataSource= new MatTableDataSource<ShowStory>();
  // = new MatTableDataSource<ShowStory>(DATA);
  // resultsLength = 0;
  constructor(public showStoryService:ShowStoryService, 
              private router:Router,
              private route:ActivatedRoute) { 
    this.storyParams = this.showStoryService.getStoryParams(this.route.snapshot.data.storytype);
  }
  

  ngOnInit(): void {
    // console.log(this.storyType);
      if(this.storyType!=undefined){
        this.storyParams.storyType = this.storyType;
      }
      this.getGenreList();
      this.getLanguageList();
      this.loadStory();
    //  this.changeDetectorRef.detectChanges();
    //   this.dataSource.paginator = this.paginator;
      
  }
  refesh(event){
      const index = this.showstory.findIndex(x => x.storyId === event.storyId);
      this.showstory[index] = event;
  }
  loadStory(){
    this.showStoryService.setStoryParams(this.storyParams);
    // console.log(this.storyParams);
    this.showStoryService.getShowStory(this.storyParams).subscribe(response => {
      this.showstory = response.result;
      this.pagination = response.pagination;
      // console.log(this.pagination)
      // this.dataSource.data = response.result;
      // this.obs = this.dataSource.connect();
    });
  }
  resetFilters(){
    this.seachTerm.nativeElement.value='';
    this.storyParams = this.showStoryService.resetStoryParams();
    this.storyParams = this.showStoryService.getStoryParams(this.route.snapshot.data.storytype);
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
  pageChanged(event:any){
    
    this.showStoryService.setStoryParams(this.storyParams);
    // this.storyParams.pageNumber++;
    //this.storyParams.pageNumber = event.page;
    this.storyParams.pageNumber=event.pageIndex+1;
    this.loadStory();
  }
  // onSortSelected(sort: string) {
  //   // const params = this.shopService.getShopParams();
  //   // params.sort = sort;
  //   // this.shopService.setShopParams(params);
  //   this.storyParams.orderBy = sort;  
  //   this.loadStory();
  // }
  onSortSelected(sort:string){
    this.storyParams.orderBy = sort;
    this.loadStory();
  }
  onGenreSelected(genre: string) {
    this.storyParams.genre = genre;
    this.loadStory();
  }
  onLanguageSelected(language:string){
    this.storyParams.language = language;
    this.loadStory();
  }
  onTypeSelected(type: string) {
    this.storyParams.storyType = type;
    console.log(this.storyParams)
    this.loadStory();
  }
  onSearch(){
    this.storyParams.search = this.seachTerm.nativeElement.value;
    this.loadStory();
  }
  pageNext(){
    console.log("next")
    //this.showStoryService.setStoryParams(this.storyParams);
    
    if(this.storyParams.pageNumber + 1 > this.pagination.totalPages)return;
    this.storyParams.pageNumber++;
    this.loadStory();
  }
  pagePrevios(){
    console.log("previos")
    //this.showStoryService.setStoryParams(this.storyParams);
    
    if(this.storyParams.pageNumber -1 < 1)return;
    this.storyParams.pageNumber--;
    this.loadStory();
  }
  randomChild(){
    this.random = !this.random;
    console.log(this.random)
  }
  ngOnDestroy(): void {
    // if (this.dataSource) { 
    //   this.dataSource.disconnect(); 
    // }
  }
}
