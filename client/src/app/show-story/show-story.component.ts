import { Component, OnInit } from '@angular/core';
// import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-show-story',
  templateUrl: './show-story.component.html',
  styleUrls: ['./show-story.component.css'],
})
export class ShowStoryComponent implements OnInit {
  
  title = 'ng-carousel-demo';
  slides = [
    {'image': '../../assets/images/slice1.png'}, 
    {'image': '../../assets/images/slice2.png'}, 
    {'image': '../../assets/images/slice3.png'}, 
    {'image': '../../assets/images/slice4.png'}, 
    {'image': '../../assets/images/slice5.png'}, 
    {'image': '../../assets/images/slice6.png'}, 
  ];

  ngOnInit(): void {
  }

}
