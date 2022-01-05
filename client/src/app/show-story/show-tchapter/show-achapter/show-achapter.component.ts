import { Component, Input } from '@angular/core';
import { Chapter } from 'src/app/_models/chapter';
import 'ts-replace-all'
@Component({
  selector: 'app-show-achapter',
  templateUrl: './show-achapter.component.html',
  styleUrls: ['./show-achapter.component.scss']
})
export class ShowAChapterComponent  {
  @Input() chapter:Chapter;
  @Input() index:string;
  @Input() fSize:string='1rem'
  @Input() fontName:string = 'montserrat'
  constructor() { }

  cutTagColor(content:string): string {
    return content = content.replaceAll('color:#000000;','');
  }
}
