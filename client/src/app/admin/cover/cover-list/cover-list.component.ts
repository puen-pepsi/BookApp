import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { CoverService } from 'src/app/_services/cover.service';

@Component({
  selector: 'app-cover-list',
  templateUrl: './cover-list.component.html',
  styleUrls: ['./cover-list.component.scss']
})
export class CoverListComponent implements OnInit {
  constructor(public coverService:CoverService,private router:Router) { }

  ngOnInit(): void {
     this.coverService.refreshList();
    //this.coverService.getphotoscreenAll().subscribe(console.log)
  }
  gotoCreate(){
    this.router.navigate(['cover/create']);
  }
  deleteNews(event){
    this.coverService.deletephotoscreen(event).subscribe( res =>{
      this.coverService.refreshList();
    })
  }

}
