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
    // this.showstorySevice.getChapterRecent().subscribe(res => {
    //    this.chapters = res;
    // })
    this.loadInitContent()
  }

  gotoChapter(storyname:string,index){
    this.router.navigate(['/stories',storyname,'chapters'],{fragment:String(index)});
  }

  gotoStory(row){
      this.router.navigate(['/stories',row.storyName]);
  }
  loadInitContent() {
    this.showstorySevice.getChapterRecent(0,10).subscribe(data =>{
      this.chapters = data;
      // console.log(this.chapters)
    });
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      //this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
      console.log("scroll down")
     }
    }
  // load th next 6 posts
loadNextPost() {
  const countContent = this.chapters.length;
  // console.log(countContent)
  this.showstorySevice.getChapterRecent(countContent,10)
    .subscribe( (data: any) => {
      const newPost = data;
      //this.spinner.hide();
      if (newPost.length === 0 ) {
        this.notEmptyPost =  false;
      }
      // add newly fetched posts to the existing post
      this.chapters = this.chapters.concat(newPost);
      console.log(this.chapters)
      this.notscrolly = true;
    });
  }
}
