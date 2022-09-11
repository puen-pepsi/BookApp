import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatCarouselSlideComponent } from 'ng-mat-carousel';
import { map } from 'rxjs/operators';
import { imagesForSlider } from 'src/app/_models/imagesForSlider';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';
@Component({
  selector: 'app-news-carousel',
  templateUrl: './news-carousel.component.html',
  styleUrls: ['./news-carousel.component.scss']
})
export class NewsCarouselComponent implements OnInit {
  @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<
  MatCarouselSlideComponent
>;
  newsHome : News[]=[];
  currentSlideIndex = 0;
  // imagesForSlider = [
  //   {path: 'assets/images/1.jpg'},
  //   {path: 'assets/images/2.jpg'},
  //   {path: 'assets/images/3.jpg'}
  // ];
  // _images: any[] = [  {path: '', width: 0, height: 0}, 
  //                     {path: '', width: 0, height: 0},
  //                     {path: '', width: 0, height: 0}, 
  //                     {path: '', width: 0, height: 0}
  //                  ];
  ImagesForSlider:imagesForSlider[];
  take:number=4;
  activeIndex:number;
  constructor(public newsService:NewsService,private router:Router) { }


  ngOnInit(): void {
     this.newsService.getNewsTake(this.take)
     .subscribe(res => {
      this.newsHome = res
      //  this.ImagesForSlider = res.map( data => {
      //     return <imagesForSlider>{path:data.pictureUrl}
      //  })
     });

  }
  gotoCreate(){
    this.router.navigate(['news/create']);
  }

  public onChange(index: number) {
    console.log(`MatCarousel#change emitted with index ${index}`);
  }
}
