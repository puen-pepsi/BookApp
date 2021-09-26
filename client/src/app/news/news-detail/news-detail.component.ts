import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  news : News;
  id:number;
  constructor(private newsService:NewsService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.newsService.getNews(this.id).subscribe(res =>{
       this.news = res;
       console.log(this.news)
    })
  }

}
