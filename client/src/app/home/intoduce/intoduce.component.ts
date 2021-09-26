import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intoduce',
  templateUrl: './intoduce.component.html',
  styleUrls: ['./intoduce.component.scss']
})
export class IntoduceComponent implements OnInit {
  registerMode = false;

  constructor() { }

  ngOnInit(): void {
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
}
