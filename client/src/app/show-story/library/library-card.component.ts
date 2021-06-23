import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShowStory } from 'src/app/_models/showstory';
import { EventEmitter } from 'stream';
import { ShowStoryService } from '../show-story.service';
import { StarRatingColor } from '../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.css']
})
export class LibraryCardComponent implements OnInit {
  @Input() story : ShowStory;
  //@Output() unlike = new EventEmitter();
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.lightblue;
  fSize : string = "1.2rem";
  starCount:number = 5;
  totalRate:number;
  yourRate:any;
  mylist : number[]=[];
    constructor(public showStoryService:ShowStoryService,
                private router:Router,
                private toastr:ToastrService) { }
  
    ngOnInit(): void {
      this.rating = this.story.rating;
      this.totalRate = this.story.totalRate;
      this.showStoryService.getYouRate(this.story.storyId).subscribe(res => {
        this.yourRate = res;
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
      this.showStoryService.addLikeStory(story.storyName).subscribe(() =>{
        this.toastr.success('You have liked '+ story.storyName);
      })
      // error => {
      //   this.toastr.warning('You already liked' + story.storyName);
      // }) 
    }
    deletLikeStory(story:any){
      
    }

}
