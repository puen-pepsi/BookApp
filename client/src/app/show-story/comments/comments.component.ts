import { Component, OnInit } from '@angular/core';
import { StoryComment } from 'src/app/_models/storycomment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor() { }
  comments:StoryComment[];
  ngOnInit(): void {
  }

}
