import { C } from '@angular/cdk/keycodes';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, of } from 'rxjs';
import { distinct, filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { ShowStoryViews } from 'src/app/_models/showstoryviews';
import { ViewsParams } from 'src/app/_models/viewsparams';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { ShowStoryService } from '../show-story.service';
export interface setRank{
        authorId:number;
        text: string;
}
@Component({
  selector: 'app-show-view',
  templateUrl: './show-view.component.html',
  styleUrls: ['./show-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class ShowViewComponent implements OnInit,AfterViewInit {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  activitiesType = ActivitiesType.Ranking;
  listItems:ShowStoryViews[];

  viewsParams : ViewsParams;
  allrank=[];
  sortOptions = [
    {name: 'Weekly', value: 'weekly'},
    {name: 'Monthly', value: 'monthly'},
    {name: 'All-Time', value: 'all-time'},
  ]
  constructor(private showStoryService:ShowStoryService,
              private activitiesService : ActivitiesService,
              private toastr:ToastrService,
              private router: Router,
              private ngZone: NgZone) { 
    this.viewsParams = this.showStoryService.getViewsParams();
  }
  ngAfterViewInit(): void {
    // this.scroller.elementScrolled().pipe(
    //   map(() => this.scroller.measureScrollOffset('bottom')),
    //   pairwise(),
    //   filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
    //   throttleTime(200)
    // ).subscribe(() => {
    //   this.ngZone.run(() => {
    //     console.log("fetch");
    //     this.fetchMore();
    //   });
    // }
    // );
    
  }
  open(event){
    this.router.navigate(['/stories',event.storyName]);
  }
  bookmark(event){
    console.log(event)
  }
  gotoMember(event){
    
  }
  nextBatch(index) {
    
      // console.log(index)

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

  GetRank(order:string){
    //order = weekly,mothly
    let arrRank = [];
          this.listItems.slice(0,10).forEach((doc,index) => {
            if(index < 10){
              arrRank.push({
                authorId:doc.authorId,
                text:(index+1)+"-"+order,
              } as setRank );
            }
          });
      from(arrRank).pipe(distinct(e=>e.authorId)).subscribe(res => {
        this.activitiesService.postTitle(this.activitiesType,res.authorId,res.text ).subscribe(res =>{
            this.toastr.success(`Give Rank to Author ${order}`,"Rank")
        })  
      })
  }
  // fetchMore(): void {
  //   const images = ['IuLgi9PWETU', 'fIq0tET6llw', 'xcBWeU4ybqs', 'YW3F-C5e8SE', 'H90Af2TFqng'];

  //   const newItems = [];
  //   for (let i = 0; i < 20; i++) {
  //     const randomListNumber = Math.round(Math.random() * 100);
  //     const randomPhotoId = Math.round(Math.random() * 4);
  //     newItems.push({
  //       title: 'List Item ' + randomListNumber,
  //       content: 'This is some description of the list - item # ' + randomListNumber,
  //       image: `https://source.unsplash.com/${images[randomPhotoId]}/50x50`
  //     });
  //   }

  //   this.listItems = [...this.listItems, ...newItems];

  // }
  
}
