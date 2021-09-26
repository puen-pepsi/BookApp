import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { Chapter } from 'src/app/_models/chapter';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-recent-chapter',
  templateUrl: './recent-chapter.component.html',
  styleUrls: ['./recent-chapter.component.scss']
})
export class RecentChapterComponent implements OnInit {
  chapters : Chapter[]=[];
  notEmptyPost = true;
  notscrolly = true;
  constructor(private showstorySevice:ShowStoryService,
              private router:Router) { }

  ngOnInit(): void {
    this.showstorySevice.getChapterRecent().subscribe(res => {
       this.chapters = res;
       console.log(this.chapters)
    })
  }
  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      // this.spinner.show();
      this.notscrolly = false;
      console.log("scroll");
      this.lazyLoad();
    }
  }

  lazyLoad(){
    //next page => page ++
    // const countContent = this.news.length;
    // this.newsService.getNewsLazyLoad(countContent,this.take).subscribe(res => {
    //   const newpost = res;
    //   if(newpost.length ===0){
    //     this.notEmptyPost = false;
    //   }
    //   this.news = this.news.concat(newpost);
    //   this.notscrolly = true;
    //});
  }
  gotoStory(row){
      console.log(row)
      this.router.navigate(['/stories',row.storyName]);
  }
}
