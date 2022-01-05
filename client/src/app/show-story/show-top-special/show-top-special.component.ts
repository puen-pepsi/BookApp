import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ShowStoryViews } from 'src/app/_models/showstoryviews';
import { ViewsParams } from 'src/app/_models/viewsparams';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-top-special',
  templateUrl: './show-top-special.component.html',
  styleUrls: ['./show-top-special.component.scss'],
})
export class ShowTopSpecialComponent implements OnInit {
  listItems:ShowStoryViews[];

  viewsParams : ViewsParams;
  allrank=[];
  sortOptions = [
    {name: 'Weekly', value: 'weekly'},
    {name: 'Monthly', value: 'monthly'},
    {name: 'All-Time', value: 'all-time'},
  ]
  constructor(private showStoryService:ShowStoryService,
                private router: Router) {
                this.viewsParams = this.showStoryService.getViewsParams();
               }

  ngOnInit(): void {
    this.loadStory();
  }
  loadStory(){
    this.showStoryService.setViewsParams(this.viewsParams);
      //console.log(this.storyParams);
     this.showStoryService.getShowStoryViews(this.viewsParams).subscribe(response =>{
                        this.listItems = response.result;
                  });

    }
  Goto(storyname:string){
    this.router.navigate(['stories',storyname]);
  }
}
