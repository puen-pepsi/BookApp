import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { slides } from 'src/app/_models/slides';
@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeCarouselComponent implements OnInit {
  @Input() slides:slides[];
  // title = 'ng-carousel-demo';
  // slides1 = [
  //  {'title':'1','url': 'https://localhost:5001/Resources/images/19e18efa-4d63-41c9-b494-be05909e06b3.jpg'},
  //   {'title':'2','url': 'https://localhost:5001/Resources/images/d6413f2f-aea6-4ee9-9078-04b379d7d6ef.jpg'}, 
  //   {id: 3, title: '3', url: 'https://localhost:5001/Resources/images/b1c427ba-4530-430e-81d4-a5e244a8b0c6.jpg', descriptions: 'test1', gotoUrl: 'www.google.com'}
  // ];
  // slides = [];
  // images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(
              private router:Router) { 
  }

  ngOnInit(): void {
    
  }
  gotoUrl(event){
    // console.log(event)
    this.router.navigateByUrl(event);
    // window.open(event, '_blank');
  }

}
