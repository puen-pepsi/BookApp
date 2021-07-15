import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Chapter } from 'src/app/_models/chapter';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-table-content',
  templateUrl: './show-table-content.component.html',
  styleUrls: ['./show-table-content.component.css']
})
export class ShowTableContentComponent implements OnInit {
  @Input() initContent:Chapter;
  storyName;
  allContent;
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
    this.showstoryService.getStoryNameChapterTake(this.storyName,0,3).subscribe(data =>{
      this.allContent = data;
      //console.log(this.allContent)
    });
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      // console.log("scroll")
      this.loadNextPost();
     }
    }
  // load th next 6 posts
loadNextPost() {
  const countContent = this.allContent.length;
  // console.log(countContent)
  this.showstoryService.getStoryNameChapterTake(this.storyName,countContent,3)
  .subscribe( (data: any) => {
     const newPost = data;
     this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPost =  false;
     }
     // add newly fetched posts to the existing post
     this.allContent = this.allContent.concat(newPost);
     this.notscrolly = true;
   });
}
clickedRows(content){
  console.log(content)
  this.router.navigate(['/stories',this.storyName,'chapters'],{fragment:String(content.id)});
  // this.router.navigate(['/stories',this.storyName,'chapters']);
}

}
