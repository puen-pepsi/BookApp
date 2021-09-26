import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadParams } from 'src/app/_models/lazyLoadParams';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-list-vertical',
  templateUrl: './show-list-vertical.component.html',
  styleUrls: ['./show-list-vertical.component.scss']
})
export class ShowListVerticalComponent implements OnInit,OnChanges {
  @Input('random')  random:boolean;

  showstory : ShowStory[];
  notEmptyPost = true;
  notscrolly = true;
  lazyloadParams = new LazyLoadParams ;
  constructor(private showStoryService:ShowStoryService,
               private spinner: NgxSpinnerService,
              private route:ActivatedRoute
             ) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.random)
    this.loadStory();
  }

  ngOnInit(): void {
    console.log(this.random)
    this.loadStory();
  }
  // onScroll() {
  //   if (this.notscrolly && this.notEmptyPost) {
  //     this.spinner.show();
  //     this.notscrolly = false;
  //     console.log("scroll");
  //     this.lazyLoad();
  //   }
  // }
  loadStory(){
    this.showStoryService.getShowStoryRandom(5).subscribe(res =>{
      this.showstory = res
      // console.log(res)
    });
  }
  // lazyLoad(){
  //   this.lazyloadParams.currentItem = this.showstory.length;
  //   this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(data => {
  //     const newPost = data;
  //    this.spinner.hide();
  //    if (newPost.length === 0 ) {
  //      this.notEmptyPost =  false;
  //    }
  //    // add newly fetched posts to the existing post
  //    this.showstory = this.showstory.concat(newPost);
  //    this.notscrolly = true;
  //   });
  // }
}
