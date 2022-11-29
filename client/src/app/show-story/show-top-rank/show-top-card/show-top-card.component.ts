import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { ShowStory } from 'src/app/_models/showstory';
import { User } from 'src/app/_models/user';
import { UserLiked } from 'src/app/_models/userLiked';
import { AccountService } from 'src/app/_services/account.service';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { ShowStoryService } from '../../show-story.service';
import { StarRatingColor } from '../../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-show-top-card',
  templateUrl: './show-top-card.component.html',
  styleUrls: ['./show-top-card.component.scss']
})
export class ShowTopCardComponent implements OnInit {
  @Input('topcard') topcard:ShowStory;
  activitiesType = ActivitiesType.followStory;
  activitiesTimer = true;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.gold3;
  fSize : string = "1.2rem";
  starCount:number = 5;
  totalRate:number;
  yourRate:any;
  user:User;
  constructor(public showStoryService:ShowStoryService,
              private activitiesService:ActivitiesService,
              private toastr:ToastrService) {

               }

  ngOnInit(): void {
    // this.showStoryService.getYouRate(this.story.storyId).subscribe(res => {
    //   this.yourRate = res;
    // });

  }
  refreshCard(event:boolean){
    this.topcard.liked = event;
  }
  // addLikeStory(story:ShowStory){
  //   this.showStoryService.addLikeStory(story).subscribe(()=>{
  //     // this.refresh();
  //     this.toastr.success('You have liked '+ story.storyName);
  //   })
  // }
  // addLikeStory(storyname:string){
  //   this.showStoryService.addLikeStory(storyname).subscribe(() => {
  //     this.toastr.success('You have liked '+ storyname);
  //     if(this.activitiesTimer){
  //       this.activitiesService.postActivities(this.activitiesType,storyname).subscribe(res =>{
  //       console.log(res);
  //     })
  //     }
      
  //   })
  // }

  // deletLikeStory(storyid:number,storyname:string){
  //   this.showStoryService.deleteStoryLike(storyid).subscribe(()=>{
  //     this.toastr.success('You have unliked '+storyname);
  //     this.activitiesTimer = false;
  //     setTimeout(() => {
  //       this.activitiesTimer = true;
  //     }, 300000);
  //   })
  // }
  // createSynopsis(content:string){
  //   return content.substr(0,180)+".....";
  // }

}
