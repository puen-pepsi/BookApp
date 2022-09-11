import { Component, Input, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-carousel',
  templateUrl: './show-carousel.component.html',
  styleUrls: ['./show-carousel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShowCarouselComponent implements OnInit {
  @Input() showstory:Partial<ShowStory[]> = [];
  @Input() storyType:string;
  // showstory:Partial<ShowStory[]>;
  // lazyloadParams = new LazyLoadParams;

  constructor(private showStoryService:ShowStoryService) { }

  ngOnInit(): void {
    // this.lazyloadParams.storyType = this.storyType;
    // this.loadStory(this.storyType);
  }

}
