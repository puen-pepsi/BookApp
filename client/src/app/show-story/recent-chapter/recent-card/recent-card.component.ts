import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Chapter } from 'src/app/_models/chapter';

@Component({
  selector: 'app-recent-card',
  templateUrl: './recent-card.component.html',
  styleUrls: ['./recent-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RecentCardComponent implements OnInit {
  @Input()  row:Chapter;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.row)
    // console.log(this.row.content.replace(/<\/?[^>]+(>|$)/g, "").length);
  }
  createContent(content:string){
    return content.replace(/<\/?[^>]+(>|$)/g, "").substring(0,350);
  }
}