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
    })
  }
  // onScroll() {
  //   if (this.notscrolly && this.notEmptyPost) {
  //     // this.spinner.show();
  //     this.notscrolly = false;
  //     this.lazyLoad();
  //   }
  // }
  gotoChapter(storyname:string,index){
    this.router.navigate(['/stories',storyname,'chapters'],{fragment:String(index)});
  }
  //lazyLoad(){
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
  //}
  gotoStory(row){
      this.router.navigate(['/stories',row.storyName]);
  }
}
