import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/_models/chapter';

@Component({
  selector: 'app-recent-card',
  templateUrl: './recent-card.component.html',
  styleUrls: ['./recent-card.component.scss']
})
export class RecentCardComponent implements OnInit {
  @Input()  row:Chapter;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.row)
  }

}
