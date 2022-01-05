import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component,  ElementRef,  OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { ScrollSpyService } from 'ng-spy';
import {  Unsubscribable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import {  slideX } from 'src/app/animation';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { Chapter } from 'src/app/_models/chapter';
import { ChapterList } from 'src/app/_models/chapterlist';
import { ShowStory } from 'src/app/_models/showstory';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { CommentService } from 'src/app/_services/comment.service';
import { ShowStoryService } from '../show-story.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAdsComponent } from './dialog-ads/dialog-ads.component';
import { BannerService } from 'src/app/_services/banner.service';
import { BannerDialogService } from 'src/app/_services/banner-dialog.service';
import { Slide } from 'src/app/_models/slide.model';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
@Component({
  selector: 'app-show-tchapter',
  templateUrl: './show-tchapter.component.html',
  styleUrls: ['./show-tchapter.component.scss'],
  animations:[
    slideX
  ]
})
export class ShowTChapterComponent implements OnInit,AfterViewInit,OnDestroy{
  @ViewChild('content',{static:true}) content:ElementRef;

  activitiesType1 = ActivitiesType.viewStory;
  activitiesType2 = ActivitiesType.likeChapter;
  activitiesTimer1 = true;
  activitiesTimer2 = 0;
  firstRead = ActivitiesType.FirstReadNovel;
  chapterList:Chapter[]=[];
  getCurrentUrl:any;
  current:string;
  storyname:string;
  chapter:string;
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
  ShowSetting:boolean = false;
  fontSize=15;
  fSize = 1;
  notFirstPost = true;
  notEmptyPost = true;
  notscrolly = true;
  notscrollyUp = true;
  list;
  bannerchapter:Slide[];
  bannerdialog:Slide[];
  fontNow:string='montserrat';
  fontType = [
    {name: 'Montserrat', value: 'montserrat'},
    {name: 'Lato', value: 'lato'},
    {name: 'Roboto',value:'roboto'}
  ]
  constructor(private showStoryService:ShowStoryService,
              private route:ActivatedRoute,
              private router:Router,
              private spyService:ScrollSpyService,
              private accountService:AccountService,
              private commentService:CommentService,
              private scroller:ViewportScroller,
              private activitiesService:ActivitiesService,
              public  dialog : MatDialog,
              private bannerService:BannerService,
              private bannerdialogService:BannerDialogService
            ) {
              this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);
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
            }
  ngOnInit(): void {
    this.storyname = this.route.snapshot.params.storyname;
    this.chapter = this.route.snapshot.fragment;
    this.showStoryService.getStorybyName(this.storyname).subscribe(res => {
      this.showstory = res;
    });
    if(this.chapter == undefined){
      this.loadInitial(0);
    }else{
      this.loadInitial(+this.chapter);
    }
    this.sub2 = this.spyService.activeSpyTarget.subscribe(
      (activeTargetName: string) => {
        if(this.current != activeTargetName){
          this.current = activeTargetName;
          this.commentChapter = +this.current;
          //console.log(this.current)
        }

      }
    );
    this.bannerdialogService.getphotobannerdialogAll().subscribe(res => {
      this.bannerdialog = res;
       //console.log(this.bannerdialog)
    })
    this.bannerService.getphotobannerAll().subscribe(res => {
      this.bannerchapter = res;
    })
    if(this.user){
      this.AddViews(this.storyname);
      if(this.activitiesTimer1){
          this.activitiesService.postActivities(this.activitiesType1,this.storyname).subscribe(res =>{
          //console.log(res);
          this.activitiesTimer1 = false;
          setTimeout(() => {
            this.activitiesTimer1 = true;
          }, 300000);
        })
      }
      this.activitiesService.postTitle(this.firstRead,0,"ReadChapter").subscribe(res =>{
        console.log(res);
      })
      if(!this.user.roles.includes("VIP")){
        this.getDialog();
      }
    }
    if(this.user == null){
        // console.log(this.user.roles)
      this.getDialog();
    }

  }
  ngAfterViewInit() {
     this.scroller.scrollToAnchor(this.goto);
     this.spyService.spy({ thresholdBottom: 50 });
  }
  getDialog(){
    setTimeout(() => {
      this.openDialog();
      }, 4000);
  }
  openDialog(): void {
   // const timeout = 5000;
    const dialogRef = this.dialog.open(DialogAdsComponent, {

      data: {
              // title : this.bannerdialog.title,
              // url:this.bannerdialog.url,
              descriptions:this.bannerdialog[0].descriptions
            }
    });
    dialogRef.afterOpened().subscribe(_ => {
      // setTimeout(() => {
      //    dialogRef.close();
      // }, timeout)
    })
  }
  // getStoryName(){
  //   return this.route.snapshot.params.storyname;
  // }
  onFontSelected(font:string){
    if(font === this.fontNow)return;
    this.fontNow = font;
  }
  AddViews(storyname :string){
    this.showStoryService.getAddViews(storyname).subscribe(()=>{

    })
  }
  gotoStory(storyname:string){
    this.router.navigate(['stories',storyname]);
  }
  goTo(target:string) {
    //this.scroller.setOffset([0,100]);
    //this.scroller.scrollToAnchor(target);
    // console.log(this.scroller.getScrollPosition())
    // this.scroller.scrollToPosition([0,1059]);
    console.log(target)
    const chapter = [...this.chapterList.values()]
      .reduce((arr,elem)=> arr.concat(elem),[])
      .find((chapter:ChapterList)=> chapter.order === +target);
      console.log(chapter);
      if(chapter){
        this.scroller.scrollToAnchor(target);
      }

    this.loadInitial(+target);
    setTimeout(() => {
      this.scroller.scrollToAnchor(target);
    }, 3000);
    // return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  toggletableContents(event){
     this.ShowComment =false;
    this.ShowCommentChapter=false;
    this.ShowSetting = false;
    this.ShowTableContent = !this.ShowTableContent;

  }
  toggleComment(event){
     this.ShowTableContent = false;
    this.ShowCommentChapter = false;
    this.ShowSetting = false;
    this.ShowComment  = !this.ShowComment;
    if(this.ShowComment){
      this.commentService.createHubConnection(this.user,this.storyname);
    }else{
      this.commentService.stopHubConnection();
    }

  }
  toggleCommentChapter(event){
    this.ShowTableContent = false;
    this.ShowComment = false;
    this.ShowSetting = false;
    this.ShowCommentChapter  = !this.ShowCommentChapter;
    if(this.ShowCommentChapter){
      this.commentService.createHubConnection(this.user,this.storyname);
    }else{
      this.commentService.stopHubConnection();
    }

  }
  toggleSetting(event){
    this.ShowComment =false;
    this.ShowCommentChapter=false;
    this.ShowTableContent=false;
    this.ShowSetting = !this.ShowSetting;
  }

  decrease(){
    this.fSize = this.fSize * 0.8;
  }

  increase(){
    this.fSize = this.fSize * 1.2;
  }
  addLikeChapter(id:number){
    console.log(id);
    this.showStoryService.addLikeChapter(id).subscribe(res =>{
      if(this.activitiesTimer2 != id && res){
        this.activitiesService.postActivities(this.activitiesType2,this.storyname).subscribe(res =>{
          this.activitiesTimer2 = id;
          setTimeout(() => {
            this.activitiesTimer2 = 0;
          }, 300000);
        })
      }
    })
  }
  onScrollDown() {
    if (this.notscrolly && this.notEmptyPost) {
      // this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
     }
    }
  // onScrollUp(){
  //   if(this.notscrollyUp && this.notFirstPost){
  //     console.log("scrollup")
  //     this.notscrollyUp = false;
  //     this.loadPrePost();
  //   }

  // }
  // loadInitial(chapter:number){
  //   this.showStoryService.getChapterLazy(this.storyname,chapter-2,3).subscribe(res =>{
  //     this.chapterList = res;

  //     // console.log(this.chapterList)
  //     setTimeout(() => {
  //       this.scroller.scrollToAnchor(String(chapter));
  //     }, 3000);
  //   });
  // }
  loadInitial(chapter:number){
      var getChapter = chapter -1 < 0 ? 0 : chapter-1;
      this.showStoryService.getChapterLazy(this.storyname,getChapter,3).subscribe(res =>{
        this.chapterList = res;
        // console.log(this.chapterList)
        setTimeout(() => {
          this.scroller.scrollToAnchor(String(getChapter));
        }, 3000);
      });
    }
  loadPrePost() {
    //const countContent = this.chapterList.length;
      var countContent = this.chapterList[0].order;
      console.log(countContent)
      if(countContent == 1){
          this.notFirstPost = false;
          return;
      }
      //(countContent - 2 < 0)?countContent = 0:countContent = countContent-2;

      this.showStoryService.getChapterLazyUp(this.storyname,countContent,1)
      .subscribe( (data:any) => {
        const newPost = data;
        //this.spinner.hide();
        // add newly fetched posts to the existing post
        this.chapterList = newPost.concat(this.chapterList);
        // this.chapterList['unshift'](newPost[0]);
        setTimeout(() => {
          this.notscrollyUp = true;
        }, 1000);

      });
    }
      // load th next 6 posts
  loadNextPost() {
  //const countContent = this.chapterList.length;
    const countContent = this.chapterList[this.chapterList.length-1].order;
    this.showStoryService.getChapterLazy(this.storyname,countContent,2)
    .subscribe( (data: any) => {
      const newPost = data;
      //this.spinner.hide();
      if (newPost.length === 0 ) {
        this.notEmptyPost =  false;
      }
      // add newly fetched posts to the existing post
      this.chapterList = this.chapterList.concat(newPost);
      this.notscrolly = true;
    });
  }
  async ngOnDestroy() {
    //console.log(this.scroller.getScrollPosition());
    this.commentService.stopHubConnection();
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}

