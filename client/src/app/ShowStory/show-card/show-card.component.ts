import { Component, Input, OnInit } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowstoryService } from 'src/app/_services/showstory.service';
import { StarRatingColor} from 'src/app/star-rating/star-rating-show/star-rating-show.component'
@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {
@Input() story : ShowStory;
rating:number = 3;
starColor:StarRatingColor = StarRatingColor.accent;
starCount:number = 5;

  constructor(private showStoryService:ShowstoryService) { }

  ngOnInit(): void {
    
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }
}
