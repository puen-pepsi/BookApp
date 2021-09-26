import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryParams } from 'src/app/_models/storyParams';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-list-horizontal',
  templateUrl: './show-list-horizontal.component.html',
  styleUrls: ['./show-list-horizontal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowListHorizontalComponent implements OnInit {
  @Input() storyType : string;
  @Output() headlogo = new EventEmitter();
  showstory : ShowStory[];
  GenreList : any=[];
  pagination :Pagination;
  storyParams : StoryParams;
  storyTypeList = [{value:'novel',display:'Novel'},{value:'manga',display:'Manga'}]
  // obs: Observable<any>;
  // dataSource= new MatTableDataSource<ShowStory>();
  // = new MatTableDataSource<ShowStory>(DATA);
  // resultsLength = 0;
  constructor(private showStoryService:ShowStoryService, 
              private route:ActivatedRoute, 
              private changeDetectorRef: ChangeDetectorRef) { 
    this.storyParams = this.showStoryService.getStoryParams(this.route.snapshot.data.storytype);
    console.log(this.storyParams)

  }
  

  ngOnInit(): void {
    // console.log(this.storyType);
      if(this.storyType!=undefined){
        this.storyParams.storyType = this.storyType;
      }
      this.getGenreList();
      this.loadStory();
    //  this.changeDetectorRef.detectChanges();
    //   this.dataSource.paginator = this.paginator;
      
  }
  loadStory(){
    this.showStoryService.setStoryParams(this.storyParams);
    //console.log(this.storyParams);
    this.showStoryService.getShowStory(this.storyParams).subscribe(response => {
      this.showstory = response.result;
      this.pagination = response.pagination;
      console.log(this.showstory)
      // this.dataSource.data = response.result;
      // this.obs = this.dataSource.connect();
    });
  }
  resetFilters(){
    this.storyParams = this.showStoryService.resetStoryParams();
    this.loadStory();
  }
  getGenreList(){
    this.showStoryService.getGenreList().subscribe(res =>{
      this.GenreList=res;
    });
  }
  pageChanged(event:any){
    this.showStoryService.setStoryParams(this.storyParams);
    //this.storyParams.pageNumber = event.page;
    this.storyParams.pageNumber=event.pageIndex+1;
    this.loadStory();
  }

  ngOnDestroy(): void {
    // if (this.dataSource) { 
    //   this.dataSource.disconnect(); 
    // }
  }

}
