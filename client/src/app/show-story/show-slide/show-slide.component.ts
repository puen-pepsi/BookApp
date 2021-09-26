import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slide } from 'src/app/_models/slide.model';
// import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SlideService } from 'src/app/_services/slide.service';

@Component({
  selector: 'app-show-slide',
  templateUrl: './show-slide.component.html',
  styleUrls: ['./show-slide.component.scss'],
  // providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class ShowSlideComponent implements OnInit {
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
  constructor(private slideService:SlideService,
              private router:Router) { 
  }

  ngOnInit(): void {
    this.slideService.getphotoslideAll().subscribe(res => {
      this.slides = res;
    })
  }
  gotoUrl(event){
    // console.log(event)
    this.router.navigateByUrl(event);
    //window.open(event, '_blank');
  }
}
