import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  constructor(public newsService:NewsService) { }

  ngOnInit(): void {
     this.newsService.refreshList();
  }
  deleteNews(event){
    this.newsService.deleteNews(event).subscribe( res =>{
      this.newsService.refreshList();
    })
  }
}
