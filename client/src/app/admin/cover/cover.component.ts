import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  slideY } from 'src/app/animation';
import { Cover } from 'src/app/_models/cover.model';
import { CoverService } from 'src/app/_services/cover.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
  animations:[
    slideY
  ]
})
export class CoverComponent implements OnInit {
  screen : Cover;
  Cover :boolean
  constructor(private coverService:CoverService,private router:Router) { }
  ngOnInit(): void {
    this.Cover = true;
    this.coverService.getRandom().subscribe(res => {
        this.screen = res;
        console.log(res);
    })
  }
  close(){
    this.Cover = false;
    // this.router.navigate(['home']);
  }
}
