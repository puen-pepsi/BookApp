import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  public isCreate:boolean;
  constructor() { }

  ngOnInit(): void {
    this.isCreate= false;
  }
  ChangeForm(event){
      this.isCreate = event;
  }
}
