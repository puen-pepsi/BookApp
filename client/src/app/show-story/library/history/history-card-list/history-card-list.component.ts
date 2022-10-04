import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShowStoryService } from 'src/app/show-story/show-story.service';
import { StarRatingColor } from 'src/app/show-story/star-rating/star-rating-show/star-rating-show.component';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { ShowHistory } from 'src/app/_models/ShowHIstory';
import { ShowStory } from 'src/app/_models/showstory';
import { UserLiked } from 'src/app/_models/userLiked';
import { ActivitiesService } from 'src/app/_services/activities.service';

@Component({
  selector: 'app-history-card-list',
  templateUrl: './history-card-list.component.html',
  styleUrls: ['./history-card-list.component.scss']
})
export class HistoryCardListComponent implements OnInit {
  @Input()  row:Partial<ShowHistory>;
  @Output() deleteId = new EventEmitter();
  activitiesType = ActivitiesType.followStory;
  activitiesTimer = true;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.lightblue;
  fSize : string = "1.2rem";
  starCount:number = 5;
  totalRate:number;
  yourRate:any;  
  userLiked:UserLiked;
  constructor(public showStoryService:ShowStoryService,
              private activitiesService:ActivitiesService,
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.rating = this.row.rating;
    this.totalRate = this.row.totalRate;
    this.showStoryService.getUserLiked(this.row.storyId).subscribe(res =>{
      this.userLiked = res;
    });
  }
  onRatingChanged(event){

  }
  goToDetial(storyname:string){
    this.router.navigate(['/stories',storyname]);
  }
  followthis(event){
    if(event.active){
      this.addLikeStory(event);
    }else{
      this.deletLikeStory(event.storyid,event.storyname);
    }
  }
  addLikeStory(story:ShowStory){
    this.showStoryService.addLikeStory(story).subscribe(() => {
      this.toastr.success('You have liked '+ story.storyName);
      if(this.activitiesTimer){
        this.activitiesService.postActivities(this.activitiesType,story.storyName).subscribe(res =>{
        console.log(res);
      })
      }
      
    })
  }
  deletLikeStory(storyid:number,storyname:string){
    this.showStoryService.deleteStoryLike(storyid).subscribe(()=>{
      this.toastr.success('You have unliked '+storyname);
      this.activitiesTimer = false;
      setTimeout(() => {
        this.activitiesTimer = true;
      }, 300000);
    })
  }
  deleteHistory(story){
    // console.log(storyId)
    this.deleteId.emit(story);
  }

}
