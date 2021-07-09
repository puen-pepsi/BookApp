import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component,  OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { ScrollSpyService } from 'ng-spy';
import {  Unsubscribable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryComment } from 'src/app/_models/storycomment';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';
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
  commentChapter:number;
  sub : Unsubscribable;
  sub2:Unsubscribable;
  showstory:ShowStory;
  user:User;
  // comments:StoryComment[]=[];
  ShowTableContent:boolean = false;
  ShowComment:boolean = false;
  ShowCommentChapter:boolean = false;
  constructor(private showStoryService:ShowStoryService,
              private route:ActivatedRoute, 
              private router:Router,
              private spyService:ScrollSpyService,
              private accountService:AccountService,
              private commentService:CommentService,
              private scroller:ViewportScroller
            ) { 
              this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);
              // this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
              //  console.log(e);
          
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
                //  console.log(e);
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
        if(this.current != activeTargetName){
          this.current = activeTargetName;
          this.commentChapter = +this.current;
          // console.log(this.current)
        }
  
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
  toggletableContents(event){
    this.ShowTableContent = !this.ShowTableContent;
    this.ShowComment =false;
    this.ShowCommentChapter=false;
  }
  toggleComment(event){
    this.ShowComment  = !this.ShowComment;
    if(this.ShowComment){
      this.commentService.createHubConnection(this.user,this.storyname);
    }else{
      this.commentService.stopHubConnection();
    }
    this.ShowTableContent = false;
    this.ShowCommentChapter = false;
  }
  toggleCommentChapter(event){
    this.ShowCommentChapter  = !this.ShowCommentChapter;
    if(this.ShowCommentChapter){
      this.commentService.createHubConnection(this.user,this.storyname);
    }else{
      this.commentService.stopHubConnection();
    }
    this.ShowTableContent = false;
    this.ShowComment = false;
  }
  async ngOnDestroy() {
    //console.log(this.scroller.getScrollPosition());
    this.commentService.stopHubConnection();
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}

