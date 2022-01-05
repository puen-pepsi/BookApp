import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowStoryViews } from 'src/app/_models/showstoryviews';

@Component({
  selector: 'app-card-top',
  templateUrl: './card-top.component.html',
  styleUrls: ['./card-top.component.scss']
})
export class CardTopComponent implements OnInit {
  @Input() card :ShowStoryViews;
  @Input() index : string;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  Goto(storyname:string){
     this.router.navigate(['stories',storyname]);
  }
}
