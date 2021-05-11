import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storychapter',
  templateUrl: './storychapter.component.html',
  styleUrls: ['./storychapter.component.css']
})
export class StorychapterComponent implements OnInit {
  public isCreate :boolean;
  constructor() { }

  ngOnInit(): void {
    // this.isCreate=false;
  }

}
