import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryParams } from 'src/app/_models/storyParams';
import { ShowStoryService } from '../show-story.service';
@Component({
  selector: 'app-show-novel',
  templateUrl: './show-novel.component.html',
  styleUrls: ['./show-novel.component.scss']
})
export class ShowNovelComponent implements OnInit {
  @Input() storyType : string;
  @Output() headlogo = new EventEmitter();
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
    // this.storyParams = this.showStoryService.getStoryParams(this.route.snapshot.data.storytype);

  }
  

  ngOnInit(): void {
    // console.log(this.storyType);
      // if(this.storyType!=undefined){
      //   this.storyParams.storyType = this.storyType;
      // }
      // this.getGenreList();
      // this.getLanguageList();
      // this.loadStory();
    //  this.changeDetectorRef.detectChanges();
    //   this.dataSource.paginator = this.paginator;
      
  }
  refesh(event){
      const index = this.showstory.findIndex(x => x.storyId === event.storyId);
      this.showstory[index] = event;
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
