import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component,  OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { ScrollSpyService } from 'ng-spy';
import {  Unsubscribable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowStoryService } from '../show-story.service';
@Component({
  selector: 'app-show-tchapter',
  templateUrl: './show-tchapter.component.html',
  styleUrls: ['./show-tchapter.component.css']
})
export class ShowTChapterComponent implements OnInit,AfterViewInit,OnDestroy{
  chapterList:any;
  getCurrentUrl:any;
  current:string;
  storyname:string;
  goto:string;
  sub : Unsubscribable;
  sub2:Unsubscribable;
  showstory:ShowStory;
  ShowTableContent:boolean = true;
  constructor(private showStoryService:ShowStoryService,
              private route:ActivatedRoute, 
              private router:Router,
              private spyService:ScrollSpyService,
              private scroller:ViewportScroller
            ) { 
              // this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
              //   console.log(e);
          
              //   // this is fix for dynamic generated(loaded..?) content
              //   setTimeout(() => {
              //     if (e.position) {
              //       this.scroller.scrollToPosition(e.position);
              //     } else if (e.anchor) {
              //       this.scroller.scrollToAnchor(e.anchor);
              //     } else {
              //       this.scroller.scrollToPosition([0, 0]);
              //     }
              //   },3000);
              //  });

              this.sub = this.router.events.pipe(filter((e): e is Scroll => e instanceof Scroll)
              ).subscribe(e => {
                // console.log(e);
                if (e.position) {
                  // backward navigation
                  setTimeout(() => {scroller.scrollToPosition(e.position); }, 0);
                } else if (e.anchor) {
                  // anchor navigation
                  setTimeout(() => {scroller.scrollToAnchor(e.anchor); }, 3000);
                  //this.goto = e.anchor;
                } else {
                  // forward navigation
                  setTimeout(() => {scroller.scrollToPosition([0, 0]); }, 0);
                }
              });

              // this.route.fragment.subscribe(params => {
              //   // let id = fragment['id'];
              //   // let guid = params['guid'];
              //     console.log(params);
              //     this.scroller.scrollToAnchor(params);
              //   // console.log(`${id},${guid}`);
              //   });

            }
  ngOnInit(): void {
    this.storyname = this.route.snapshot.params.storyname;
    this.showStoryService.getStorybyName(this.storyname).subscribe(res => {
      this.showstory = res;
    })
    this.showStoryService.getStoryNameChapter(this.storyname).subscribe(res =>{
      this.chapterList = res;
    });
    this.AddViews(this.storyname);

    this.sub2 = this.spyService.activeSpyTarget.subscribe(
      (activeTargetName: string) => {
        this.current = activeTargetName;
        
      }
    );
    
  }
  ngAfterViewInit() {
     this.scroller.scrollToAnchor(this.goto);
     this.spyService.spy({ thresholdBottom: 50 });  
  }
  
  // getStoryName(){
  //   return this.route.snapshot.params.storyname;
  // }
 
  AddViews(storyname :string){
    this.showStoryService.getAddViews(storyname).subscribe(()=>{
      
    })
  }
  goTo(target:string) {
    //this.scroller.setOffset([0,100]);
    this.scroller.scrollToAnchor(target);
    // console.log(this.scroller.getScrollPosition())
    // this.scroller.scrollToPosition([0,1059]);
  }
  toggle(event){
    this.ShowTableContent = event;
  }
  async ngOnDestroy() {
    console.log(this.scroller.getScrollPosition());
    
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}

