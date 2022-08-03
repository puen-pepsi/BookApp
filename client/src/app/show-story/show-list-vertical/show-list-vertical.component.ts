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

  showstory : Partial<ShowStory[]>;
  notEmptyPost = true;
  notscrolly = true;
  lazyloadParams = new LazyLoadParams ;
  constructor(private showStoryService:ShowStoryService,
               private spinner: NgxSpinnerService,
              private route:ActivatedRoute
             ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadStory();
  }

  ngOnInit(): void {
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
  
}
