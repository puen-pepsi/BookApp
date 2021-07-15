import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from 'src/app/_models/chapter';
import { StoryComment } from 'src/app/_models/storycomment';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-comment-chapter',
  templateUrl: './show-comment-chapter.component.html',
  styleUrls: ['./show-comment-chapter.component.css']
})
export class ShowCommentChapterComponent implements OnInit {
  @Input() comments:StoryComment[];
  storyName;
  ChapterList:Chapter[]=[];
  constructor(private showstoryService:ShowStoryService ,
              private route:ActivatedRoute,
              private router:Router){ }

  ngOnInit(): void {
    this.storyName = this.route.snapshot.params.storyname;
    this.showstoryService.getStoryNameChapter(this.storyName).subscribe(res =>{
       this.ChapterList = res;
       //console.log(this.ChapterList)
    });
  }
  
 
}
