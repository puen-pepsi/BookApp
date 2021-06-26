import { Component, Input, OnInit, Output } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { StarRatingColor} from 'src/app/show-story/star-rating/star-rating-show/star-rating-show.component'
import { ToastrService } from 'ngx-toastr';
import { ShowStoryService } from '../show-story.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';
import { UserLiked } from 'src/app/_models/userLiked';
@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {
@Input() story : ShowStory;
rating:number=0;
starColor:StarRatingColor = StarRatingColor.lightblue;
fSize : string = "1.2rem";
starCount:number = 5;
totalRate:number;
yourRate:any;
mylist : number[]=[];
userLiked : UserLiked;
  constructor(public showStoryService:ShowStoryService,
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.rating = this.story.rating;
    this.totalRate = this.story.totalRate;
    this.showStoryService.getYouRate(this.story.storyId).subscribe(res => {
      this.yourRate = res;
    });
    this.showStoryService.getUserLiked(this.story.storyId).subscribe(res =>{
      this.userLiked = res;
    });
  }
  goToDetial(storyname:string){
    this.router.navigate(['/stories',storyname]);
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }
  addLikeStory(story:ShowStory){
    this.showStoryService.addLikeStory(story.storyName).subscribe(() => {
      this.toastr.success('You have liked '+ story.storyName);
    })
    // error => {
    //   this.toastr.warning('You already liked' + story.storyName);
    // }) 
  }
  deletLikeStory(story:any){
    
  }
}
