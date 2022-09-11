import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {  AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { Chapter } from 'src/app/_models/chapter';
import { ShowStoryService } from '../../show-story.service';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit,AfterViewInit {
  @ViewChild('scroller') scroller:CdkVirtualScrollViewport;
  listItems:Chapter[];
  loading=false;
  notEmptyPost=true;
  constructor(private showstorySevice:ShowStoryService,
                  private ngZone:NgZone) { }
  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        console.log("bottom");
        this.loadNextPost();
      });
    }
    );
  }

  ngOnInit(): void {
    this.loadinit();
  }

  loadinit(){
    this.showstorySevice.getChapterRecent(0,5).subscribe(data =>{
      this.listItems = data;
      console.log(this.listItems)
    });
  }
  // fetchMore(){
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

  //   this.loading = true;
  //   timer(1000).subscribe(() => {
  //     this.loading = false;
  //     this.listItems = [...this.listItems, ...newItems];
  //   });

  // }
  loadNextPost() {
    if(!this.notEmptyPost)return;
    const countContent = this.listItems.length;
    // console.log(countContent)
    this.showstorySevice.getChapterRecent(countContent,5)
      .subscribe( (data: any) => {
        const newPost = data;
        //this.spinner.hide();
        if (newPost.length === 0 ) {
          this.notEmptyPost =  false;
        }
        // add newly fetched posts to the existing post
        this.loading = true;
        timer(1000).subscribe(()=>{
            this.loading = false;
            this.listItems = this.listItems.concat(newPost);
            console.log(this.listItems)
        })
      });
    }
}
