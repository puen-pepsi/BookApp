import { Component, Input, OnInit } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowstoryService } from 'src/app/_services/showstory.service';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {
@Input() story : ShowStory;
  constructor(private showStoryService:ShowstoryService) { }

  ngOnInit(): void {
  }

}
