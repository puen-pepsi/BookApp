import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryParams } from 'src/app/_models/storyParams';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit,OnDestroy {
  showstory : ShowStory[];
  GenreList : any=[];
  pagination :Pagination;
  storyParams : StoryParams;
  // obs: Observable<any>;
  // dataSource= new MatTableDataSource<ShowStory>();
  // = new MatTableDataSource<ShowStory>(DATA);
  // resultsLength = 0;
  constructor(private showStoryService:ShowStoryService,private changeDetectorRef: ChangeDetectorRef) { 
    this.storyParams = this.showStoryService.getStoryParams();
  }
  

  ngOnInit(): void {
      this.getGenreList();
      this.loadStory();
    //  this.changeDetectorRef.detectChanges();
    //   this.dataSource.paginator = this.paginator;
      
  }
  loadStory(){
    // console.log(this.storyParams)
    this.showStoryService.setStoryParams(this.storyParams);
    this.showStoryService.getShowStory(this.storyParams).subscribe(response => {
      this.showstory = response.result;
      this.pagination = response.pagination;
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
