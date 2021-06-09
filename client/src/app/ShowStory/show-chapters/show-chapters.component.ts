import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/_models/chapter';
import { ShowstoryService } from 'src/app/_services/showstory.service';

@Component({
  selector: 'app-show-chapters',
  templateUrl: './show-chapters.component.html',
  styleUrls: ['./show-chapters.component.css']
})
export class ShowChaptersComponent implements OnInit {
  @Input() ChapterList :any;
  constructor(private showstoryService:ShowstoryService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {  
    // const {storyname} = this.route.snapshot.params;
    // console.log(storyname);
    // this.showstoryService.getStoryNameChapter(storyname).subscribe(res =>{
    //   this.ChapterList = res;
    // })
  }

}
