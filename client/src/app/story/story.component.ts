import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  public isCreate:boolean;
  constructor() { }

  ngOnInit(): void {
    this.isCreate= false;
  }
  ChangeForm(event){
    //console.log(event);
      this.isCreate = event;
  }
}
