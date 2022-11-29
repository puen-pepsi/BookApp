import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  news : News[]=[];
  notEmptyPost = true;
  notscrolly = false;
  newLoad = false;
  take =10;
  constructor(public newsService:NewsService,private router:Router) {
    
   }

  ngOnInit(): void {
    // this.loadnews();
    // console.log("OnInit")
    this.lazyLoad();
    
  }
  onScrollDown(ev:any) {
    // console.log("scroll",ev)

    if (this.notscrolly && this.notEmptyPost) {
      // this.spinner.show();
      this.notscrolly = false;
      this.lazyLoad();
    }
  }
  // loadnews(){
  //   this.newsService.getNewsTake(this.take).subscribe(res => {
  //     this.news = res;
  //     console.log("LoadNews")
  //  });
  // }
  lazyLoad(){
    //next page => page ++
    const countContent = this.news.length;
    this.newsService.getNewsLazyLoad(countContent,this.take).subscribe(res => {
      const newpost = res;
      if(newpost.length ===0){
        this.notEmptyPost = false;
      }
      this.news = this.news.concat(newpost);
      this.notscrolly = true;
    });
  }
  gotoCreate(){
    this.router.navigate(['news/create']);
  }
  deleteNews(event){
    this.newsService.deleteNews(event).subscribe( res =>{
      this.newsService.refreshList();
    })
  }
}
