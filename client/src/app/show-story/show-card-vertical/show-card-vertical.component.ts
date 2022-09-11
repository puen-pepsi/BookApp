import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ShowStory } from 'src/app/_models/showstory';
import { StarRatingColor } from '../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-show-card-vertical',
  templateUrl: './show-card-vertical.component.html',
  styleUrls: ['./show-card-vertical.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShowCardVerticalComponent implements OnInit {
  @Input()  row:ShowStory;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.lightblue;
  fSize : string = "0.8rem";
  starCount:number = 5;
  totalRate:number;
  yourRate:any;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.rating = this.row.rating;
    this.totalRate = this.row.totalRate;
  }
  onRatingChanged(event){

  }
  goToDetial(storyname:string){
    this.router.navigate(['/stories',storyname]);
  }
}
