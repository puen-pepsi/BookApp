import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/_models/chapter';

@Component({
  selector: 'app-show-achapter',
  templateUrl: './show-achapter.component.html',
  styleUrls: ['./show-achapter.component.css']
})
export class ShowAChapterComponent implements OnInit {
  @Input() chapter:Chapter;
  @Input() index:string;
  @Input() fSize:string='1rem'
  constructor() { }

  ngOnInit(): void {
  }

}
