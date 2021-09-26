import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/_models/chapter';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss']
})
export class NavSidebarComponent implements OnInit {
  // @Input() chapterList:any;
  @Input() storyName:string;
  @Output() Show = new EventEmitter();
  @Output() target = new EventEmitter();
  isShow:boolean=false;
  chapterList:any;
  constructor(private scroller:ViewportScroller,
              private showStoryService:ShowStoryService,
              private router:Router) { }

  ngOnInit(): void {
      this.getChapterName();
  }
  getChapterName(){
    this.showStoryService.getChapterList(this.storyName,0,0)
         .subscribe( res => {
             this.chapterList = res;
             console.log(this.chapterList)
         });
   }
  goTo(target:string) {
    //this.scroller.setOffset([0,100]);
    // this.scroller.scrollToAnchor("Chapter-"+ target);
    // console.log(this.scroller.getScrollPosition())
    // this.scroller.scrollToPosition([0,1059]);
    // this.router.navigate( [  ], { fragment: "Chapter-"+ target } )
    //this.router.navigate([], { fragment: 'Chapter-'+target });
    this.target.emit(target);
  }
  toggle(event) {
    this.Show.emit(event);
  }
}
