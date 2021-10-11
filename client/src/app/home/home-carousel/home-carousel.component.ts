import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slide2Service } from 'src/app/_services/slide2.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {
  title = 'ng-carousel-demo';
  slides = [
    // {'image': '../../assets/images/slice1.png'}, 
    // {'image': '../../assets/images/slice2.png'}, 
    // {'image': '../../assets/images/slice3.png'}, 
    // {'image': '../../assets/images/slice4.png'}, 
    // {'image': '../../assets/images/slice5.png'}, 
    // {'image': '../../assets/images/slice6.png'}, 
  ];

  // images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private slide2Service:Slide2Service,
              private router:Router) { 
  }

  ngOnInit(): void {
    this.slide2Service.getphotoslideAll().subscribe(res => {
      this.slides = res;
    })
  }
  gotoUrl(event){
    // console.log(event)
    this.router.navigateByUrl(event);
    //window.open(event, '_blank');
  }
}
