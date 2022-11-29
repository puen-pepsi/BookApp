import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectionStrategy } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { StarRatingColor} from 'src/app/show-story/star-rating/star-rating-show/star-rating-show.component'
import { ToastrService } from 'ngx-toastr';
import { ShowStoryService } from '../show-story.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { UserLiked } from 'src/app/_models/userLiked';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShowCardComponent implements OnInit {
@Input() story : ShowStory;
@Input() index : number;
@Input() page : number;
@Input() pagesize :number;
@Output() refresh = new EventEmitter<ShowStory>();
activitiesType = ActivitiesType.followStory;
activitiesTimer = true;
rating:number=0;
starColor:StarRatingColor = StarRatingColor.lightblue;
fSize : string = "1.2rem";
starCount:number = 5;
totalRate:number;
// yourRate:any;
mylist : number[]=[];
// userLiked : UserLiked;
user:User;
  constructor(private showStoryService:ShowStoryService,
              private activitiesService:ActivitiesService,
              private router:Router,
              private accountService:AccountService,
              private toastr:ToastrService) { 
                this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
                  this.user = user;
                })
              }

  ngOnInit(): void {
    // this.rating = this.story.rating;
    this.totalRate = this.story.totalRate;
    // this.showStoryService.getYouRate(this.story.storyId).subscribe(res => {
    //   this.yourRate = res;
    // });
    // if(this.user){
    //   this.showStoryService.getUserLiked(this.story.storyId).subscribe(res =>{
    //     this.userLiked = res;
    //   });      
    // }
  }
  goToDetial(storyname:string){
    this.router.navigate(['/stories',storyname]);
  }
  onRatingChanged(rating){
    this.showStoryService.getPostRate(rating,this.story).subscribe(res => {
      this.story = res;
      this.refresh.emit(res);
    });
  }
  toggleFollow(event:ShowStory){
    // if(event.liked){
    //   this.addLikeStory(event);
    // }else{
    //   // this.deletLikeStory(event.storyId,event.storyName);
    // }
    //this.story.liked = event;
    this.refresh.emit(event)
  }

 

}
