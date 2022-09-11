import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-intoduce',
  templateUrl: './intoduce.component.html',
  styleUrls: ['./intoduce.component.scss']
})
export class IntoduceComponent implements OnInit {
  registerMode = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  goTo(){
    this.router.navigateByUrl("/stories");
  }
  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
}
