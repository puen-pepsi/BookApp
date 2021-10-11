import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerDialogService } from 'src/app/_services/banner-dialog.service';

@Component({
  selector: 'app-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrls: ['./banner-dialog.component.scss']
})
export class BannerDialogComponent implements OnInit {
  constructor(public bannerdialogService:BannerDialogService,private router:Router) { }

  ngOnInit(): void {
     this.bannerdialogService.refreshList();
    //this.coverService.getphotoscreenAll().subscribe(console.log)
  }
  gotoCreate(){
    this.router.navigate(['bannerdialog/create']);
  }
  deleteNews(event){
    this.bannerdialogService.deletephotobannerdialog(event).subscribe( res =>{
      this.bannerdialogService.refreshList();
    })
  }
}
