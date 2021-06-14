import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription, Unsubscribable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryComment } from 'src/app/_models/storycomment';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit ,OnDestroy{
  @ViewChild('storyTabs',{static:true}) storyTabs:TabsetComponent;
  showstory : ShowStory;
  user : User;
  activeTab:TabDirective;
  rating:number=0;
  starCount:number = 5;
  yourRate:any;
  storyName:string;
  chapterList:any;
  comments:StoryComment[]=[];
  constructor(public showStoryService:ShowStoryService,
    private route:ActivatedRoute,
    private accountService:AccountService,
    private commentService:CommentService,
    private bcService:BreadcrumbService,
    private router:Router,
    ) { 
          this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user =user);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  ngOnInit(): void {
    this.storyName = this.route.snapshot.params.storyname;
    this.refresh();
    // this.bcService.set('@detial',this.showstory.storyName);
    
  }
  loadComments() {
    this.commentService.getComments(this.storyName).subscribe(comment => {
      this.comments = comment;
    })
  }
  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading==='Table of Contents'){
      this.showStoryService.getStoryNameChapter(this.storyName).subscribe(res =>{
        this.chapterList = res;
      });
    }
    if(this.activeTab.heading==='Comments' && this.comments.length === 0){
      this.commentService.createHubConnection(this.user,this.storyName);
    }else{
      this.commentService.stopHubConnection();
    }
  }
  onRatingChanged(rating:number){
    this.rating = rating;
    this.showStoryService.getPostRate(rating,this.showstory.storyId).subscribe(res => {
      console.log(res);
      this.refresh();
    });
  }
  refresh(){
    this.route.data.subscribe(data => {
      this.showstory = data.showstory;
      this.rating = this.showstory.rating;
      this.bcService.set('@detial',this.showstory.storyName);
    });
    this.showStoryService.getYouRate(this.showstory.storyId).subscribe(res => {
      this.yourRate = res;
    });
  }
  // getStoryName(){
  //   return this.route.snapshot.params.storyname;
  // }
  ngOnDestroy(): void {
    this.commentService.stopHubConnection();
  }
}
