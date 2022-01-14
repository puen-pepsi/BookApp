import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChapterList } from 'src/app/_models/chapterlist';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-table-content',
  templateUrl: './show-table-content.component.html',
  styleUrls: ['./show-table-content.component.scss']
})
export class ShowTableContentComponent implements OnInit {
  @Input() initContent:ChapterList;
  storyName;
  allContent:ChapterList[]=[];
  notEmptyPost = true;
  notscrolly = true;
  constructor(private showstoryService:ShowStoryService,private spinner: NgxSpinnerService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.storyName = this.route.snapshot.params.storyname;
    this.loadInitContent();
  }
  loadInitContent() {
    this.showstoryService.getChapterList(this.storyName,0,10).subscribe(data =>{
      this.allContent = data;
      //console.log(this.allContent)
    });
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      //this.spinner.show();
      this.notscrolly = false;
      console.log("scroll")
      this.loadNextPost();
     }
    }
  // load th next 6 posts
loadNextPost() {
  const countContent = this.allContent.length;
  // console.log(countContent)
  this.showstoryService.getChapterList(this.storyName,countContent,5)
  .subscribe( (data: any) => {
     const newPost = data;
     //this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPost =  false;
     }
     // add newly fetched posts to the existing post
     this.allContent = this.allContent.concat(newPost);
     this.notscrolly = true;
   });
}
clickedRows(index){
  //console.log(index)
  this.router.navigate(['/stories',this.storyName,'chapters'],{fragment:String(index)});
  // this.router.navigate(['/stories',this.storyName,'chapters']);
}

}
