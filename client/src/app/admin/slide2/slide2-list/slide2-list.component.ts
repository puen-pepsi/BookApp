import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slide2Service } from 'src/app/_services/slide2.service';

@Component({
  selector: 'app-slide2-list',
  templateUrl: './slide2-list.component.html',
  styleUrls: ['./slide2-list.component.scss']
})
export class Slide2ListComponent implements OnInit {
  constructor(public slide2Service:Slide2Service,private router:Router) { }

  ngOnInit(): void {
     this.slide2Service.refreshList();
    //this.coverService.getphotoscreenAll().subscribe(console.log)
  }
  gotoCreate(){
    this.router.navigate(['slide2/create']);
  }
  deleteNews(event){
    this.slide2Service.deletephotoslide(event).subscribe( res =>{
      this.slide2Service.refreshList();
    })
  }

}
