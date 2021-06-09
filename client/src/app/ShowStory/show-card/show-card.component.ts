import { Component, Input, OnInit } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowstoryService } from 'src/app/_services/showstory.service';
import { StarRatingColor} from 'src/app/star-rating/star-rating-show/star-rating-show.component'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {
@Input() story : ShowStory;
rating:number=0;
starColor:StarRatingColor = StarRatingColor.accent;
starCount:number = 5;
totalRate:number;
yourRate:any;
  constructor(private showStoryService:ShowstoryService) { }

  ngOnInit(): void {
    this.rating = this.story.rating;
    this.totalRate = this.story.totalRate;
    this.showStoryService.getYouRate(this.story.storyId).subscribe(res => {
      this.yourRate = res;
    });
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }
}
