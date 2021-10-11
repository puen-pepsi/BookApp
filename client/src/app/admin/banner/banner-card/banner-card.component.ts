import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from 'src/app/_models/banner';
import { Slide } from 'src/app/_models/slide.model';
import { BannerService } from 'src/app/_services/banner.service';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss']
})
export class BannerCardComponent implements OnInit {
  @Input() row:Slide;
  @Output() deleteId = new EventEmitter();
  constructor(public bannerService:BannerService,
              private router : Router) { }

  ngOnInit(): void {
  }
  populateForm(selectedRecord: Slide) {
    this.bannerService.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['admin/banner/edit',this.bannerService.formData.id]);
  }
  deleteRow(selectedRow:Slide){
    this.deleteId.emit(selectedRow.id);
  }


}
