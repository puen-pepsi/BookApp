import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { ShowStory } from '../_models/showstory';
import { ShowstoryService } from '../_services/showstory.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  storylikes : Partial<ShowStory[]>;
  // predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination:Pagination;
  constructor(private showstoryService:ShowstoryService) { }

  ngOnInit(): void {
    this.loadStoryLikes();
  }
  loadStoryLikes(){
    this.showstoryService.getStoryLikes(this.pageNumber,this.pageSize).subscribe(response =>{
      this.storylikes = response.result;
      this.pagination = response.pagination;
    })
  }
  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadStoryLikes();
  }
}
