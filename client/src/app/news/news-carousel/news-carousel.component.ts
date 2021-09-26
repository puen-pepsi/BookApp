import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-news-carousel',
  templateUrl: './news-carousel.component.html',
  styleUrls: ['./news-carousel.component.scss']
})
export class NewsCarouselComponent implements OnInit {
  newsHome : News[]=[];
  take:number=3;
  constructor(public newsService:NewsService,private router:Router) { }

  ngOnInit(): void {
     this.newsService.getNewsTake(this.take).subscribe(res => {
        this.newsHome = res;
        console.log(this.newsHome)
     });
  }
  gotoCreate(){
    this.router.navigate(['news/create']);
  }

}
