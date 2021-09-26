import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imagesForSlider = [
    {path: '../../assets/images/slice1.png'},
    {path: '../../assets/images/slice2.png'},
    {path: '../../assets/images/slice3.png'},
    {path: '../../assets/images/slice4.png'},
    {path: '../../assets/images/slice5.png'},
    {path: '../../assets/images/slice6.png'},
  ];
  constructor() { }

  ngOnInit(): void {
    
  }

}
