import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/_services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  constructor(public bannerService:BannerService,private router:Router) { }

  ngOnInit(): void {
     this.bannerService.refreshList();
    //this.coverService.getphotoscreenAll().subscribe(console.log)
  }
  gotoCreate(){
    this.router.navigate(['banner/create']);
  }
  deleteNews(event){
    this.bannerService.deletephotobanner(event).subscribe( res =>{
      this.bannerService.refreshList();
    })
  }

}
