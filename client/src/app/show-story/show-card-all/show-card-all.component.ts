import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowStory } from 'src/app/_models/showstory';
import { StarRatingColor } from '../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-show-card-all',
  templateUrl: './show-card-all.component.html',
  styleUrls: ['./show-card-all.component.scss']
})
export class ShowCardAllComponent implements OnInit {
  @Input()  row:ShowStory;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.lightblue;
  fSize : string = "0.8rem";
  starCount:number = 5;
  totalRate:number;
  yourRate:any;
  tag:string[]=[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.rating = this.row.rating;
    this.totalRate = this.row.totalRate;
    if(this.row.tags != null){
        this.tag = this.row.tags.split(",");
    }
  }
  onRatingChanged(event){

  }
  goToTag(ele:string){
    this.router.navigate(['/stories/tag',ele]);
  }
  goToDetial(storyname:string){
    this.router.navigate(['/stories',storyname]);
  }
  gotoChapter(storyname:string,index){
    this.router.navigate(['/stories',storyname,'chapters'],{fragment:String(index)});
  }
  NewChapter(created:string):boolean{
    let today:Date = new Date();
    let createdTime:Date = new  Date(created);
    let timeInMilisec: number = today.getTime() - createdTime.getTime();
    let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
    
    return daysBetweenDates < 14 ? true : false ;
  }
  
}
