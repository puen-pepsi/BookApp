import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { idLocale } from 'ngx-bootstrap/chronos';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() row:News;
  @Output() deleteId = new EventEmitter();
  constructor(public newsService:NewsService,
              private router : Router) { }

  ngOnInit(): void {
  }
  populateForm(selectedRecord: News) {
    this.newsService.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['news/edit',this.newsService.formData.id]);
  }
  deleteRow(selectedRow:News){
    console.log(selectedRow.id)
    this.deleteId.emit(selectedRow.id);
  }
}
