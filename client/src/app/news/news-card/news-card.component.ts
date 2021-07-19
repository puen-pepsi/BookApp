import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() row:News;

  constructor(public newsService:NewsService,
              private router : Router) { }

  ngOnInit(): void {
  }
  populateForm(selectedRecord: News) {
    this.newsService.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['news/edit',this.newsService.formData.id]);
  }
}
