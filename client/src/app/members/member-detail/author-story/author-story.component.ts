import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ShowStoryService } from 'src/app/show-story/show-story.service';
import { StarRatingColor } from 'src/app/show-story/star-rating/star-rating-show/star-rating-show.component';
import { Pagination } from 'src/app/_models/pagination';
import { ShowStory } from 'src/app/_models/showstory';

@Component({
  selector: 'app-author-story',
  templateUrl: './author-story.component.html',
  styleUrls: ['./author-story.component.scss']
})
export class AuthorStoryComponent implements OnInit {
  @Input() authorname:string;
  showstory : Partial<ShowStory[]>;
  pageNumber = 1;
  pageSize = 10;
  pagination:Pagination;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.lightblue;
  fSize : string = "1.2rem";
  starCount:number = 5;

  constructor(public showStoryService:ShowStoryService) { }

  ngOnInit(): void {
    this.loadAuthorStory();
  }
  loadAuthorStory(){
    this.showStoryService.getStoryAuthor(this.pageNumber,this.pageSize,this.authorname).subscribe(response =>{
      this.showstory = response.result;
      this.pagination = response.pagination;
    });
  }
  pageChanged(event:any){
    // this.pageNumber = event.page;
    this.pageNumber = event.pageIndex+1;
    this.loadAuthorStory();
  }
}
