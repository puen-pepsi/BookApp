import { Component, Input, OnInit } from '@angular/core';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { Chapter } from 'src/app/_models/chapter';

@Component({
  selector: 'app-show-achapter',
  templateUrl: './show-achapter.component.html',
  styleUrls: ['./show-achapter.component.scss']
})
export class ShowAChapterComponent implements OnInit {
  @Input() chapter:Chapter;
  @Input() index:string;
  @Input() fSize:string='1rem'
  @Input() fontName:string = 'montserrat'
  constructor() { }

  ngOnInit(): void {
  }

}
