import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {
  @Input() chapterList:any;
  @Output() Show = new EventEmitter();
  @Output() target = new EventEmitter();
  isShow:boolean=false;
  constructor(private scroller:ViewportScroller,
              private router:Router) { }

  ngOnInit(): void {
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
    this.isShow = !this.isShow;
    this.Show.emit(this.isShow);
  }
}
