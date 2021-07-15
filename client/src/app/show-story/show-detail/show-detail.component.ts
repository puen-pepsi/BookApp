import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, Scroll } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Unsubscribable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Chapter } from 'src/app/_models/chapter';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryComment } from 'src/app/_models/storycomment';
import { User } from 'src/app/_models/user';
import { Userhistory } from 'src/app/_models/userhistory';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShowStoryService } from '../show-story.service';
import { StarRatingColor } from '../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit ,OnDestroy{
  @ViewChild('storyTabs',{static:true}) storyTabs:TabsetComponent;
  starColor:StarRatingColor = StarRatingColor.lightblue;
  fSize : string = "2rem";
  showstory : ShowStory;
  userHistory : Userhistory;
  userLiked:any;
  user : User;
  activeTab:TabDirective;
  rating:number=0;
  starCount:number = 5;
  yourRate:any;
  storyName:string;
  chapterList:Chapter[];
  comments:StoryComment[]=[];
  tags:string[];
  hubOn:boolean=false;
  initContent:Chapter[]=[];
  constructor(public showStoryService:ShowStoryService,
    private route:ActivatedRoute,
    private accountService:AccountService,
    private commentService:CommentService,
    private toastr:ToastrService,
    private bcService:BreadcrumbService,
    private router:Router,
    ) { 
          this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;

          // this.bcService.set("@detail",'');

    
    }
  ngOnInit(): void {
    this.storyName = this.route.snapshot.params.storyname;
    this.refresh();
    // this.showStoryService.getStoryHistory(this.pageNumber,this.pageSize).subscribe(response =>{
    //   this.storyHistory = response.result;
    //   this.pagination = response.pagination;
    // })
    // this.bcService.set('@detial',this.showstory.storyName);
    if(this.showstory.tags){
          this.tags = this.showstory.tags.split(",");
    }
  }
  // loadComments() {
  //   this.commentService.getComments(this.storyName).subscribe(comment => {
  //     this.comments = comment;
  //   })
  // }
  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading==='Table of Contents'){
      // this.showStoryService.getStoryNameChapter(this.storyName).subscribe(res =>{
      //   this.chapterList = res;
      // });
    }
    // if(this.activeTab.heading==='Novel Comments' && this.comments.length === 0){
    //   this.commentService.createHubConnection(this.user,this.storyName);
    // }else{
    //   this.commentService.stopHubConnection();
    // }
    if(this.activeTab.heading==='Chapter Comments' && this.comments.length === 0){
      if(!this.hubOn){
          this.commentService.createHubConnection(this.user,this.storyName);
          this.hubOn = true;
      }
    }else if(this.activeTab.heading==='Novel Comments' && this.comments.length===0){
      if(!this.hubOn){
          this.commentService.createHubConnection(this.user,this.storyName);
          this.hubOn = true;
      }   
    }else{
      this.commentService.stopHubConnection();
      this.hubOn = false;
    }
  }
  onRatingChanged(rating:number){
    this.rating = rating;
    this.showStoryService.getPostRate(rating,this.showstory).subscribe(() => {
      //this.rating = res.rating;
      this.refresh();
    });
  }
  refresh(){
    this.route.data.subscribe(data => {
      this.showstory = data.showstory;
      this.rating = this.showstory.rating;
    });
    this.showStoryService.getYouRate(this.showstory.storyId).subscribe(res => {
      this.yourRate = res;
    });
    this.showStoryService.getUserHistory(this.showstory.storyId).subscribe(res =>{
      this.userHistory = res;
    });
    this.showStoryService.getUserLiked(this.showstory.storyId).subscribe(res =>{
      this.userLiked = res;
      // console.log(this.userLiked)
    })
  }
  addLikeStory(story:ShowStory){
    this.showStoryService.addLikeStory(story.storyName).subscribe(() =>{
      this.refresh();
      this.toastr.success('You have liked '+ story.storyName);
    })
  }
  
  // getStoryName(){
  //   return this.route.snapshot.params.storyname;
  // }
  ngOnDestroy(): void {
    this.commentService.stopHubConnection();
  }
}
