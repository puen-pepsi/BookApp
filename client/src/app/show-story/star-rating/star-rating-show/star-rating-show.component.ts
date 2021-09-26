import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-star-rating-show',
  templateUrl: './star-rating-show.component.html',
  styleUrls: ['./star-rating-show.component.scss']
})
export class StarRatingShowComponent implements OnInit {
  @Input('rating')  rating: number=0;
  @Input('starCount')  starCount: number = 5;
  @Input('color')  color: string = 'accent';
  @Input() fSize : string = '1rem';
  @Input() wSize : string = '1rem';
  @Input('totalRate') totalRate:number=0;
  @Input('yourRate') yourRate:number;
  @Output()  ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;
  ratingArr = [];
  response = [
    'You broke my heart!',
    'Really?',
    'We will do better next time.',
    'Glad you like it!',
    'Thank you so much!'
  ]
  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() {
  
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    this.snackBar.open(this.response[rating-1],'',{
      duration:this.snackBarDuration,
      panelClass:['snack-bar']
    });
    this.ratingUpdated.emit(rating);
    return false;
  }
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
  export enum StarRatingColor {
    primary = "primary",
    accent = "accent",
    warn = "warn",
    gold1 ="#FFD700",
    gold2 ="#FFBF00",
    gold3 ="#FFD500",
    lightblue ="lightskyblue"
  }

