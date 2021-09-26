import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideService } from 'src/app/_services/slide.service';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.scss']
})
export class SlideListComponent implements OnInit {
  constructor(public slideService:SlideService,private router:Router) { }

  ngOnInit(): void {
     this.slideService.refreshList();
    //this.coverService.getphotoscreenAll().subscribe(console.log)
  }
  gotoCreate(){
    this.router.navigate(['slide/create']);
  }
  deleteNews(event){
    this.slideService.deletephotoslide(event).subscribe( res =>{
      this.slideService.refreshList();
    })
  }

}
