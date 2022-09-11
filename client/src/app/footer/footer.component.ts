import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from '../_models/tag';
import { StoryService } from '../_services/story.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  @Input() tagArray;
  @Input() footerlogo:string;
  @Input() bgtool:string;
  currentYear;
  constructor(private storyService:StoryService,
              private router:Router) { }

  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();
  }


   logoClick(event){
    this.router.navigate(["/"]);
  }
}
