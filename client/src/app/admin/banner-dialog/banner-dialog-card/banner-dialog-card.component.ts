import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Slide } from 'src/app/_models/slide.model';
import { BannerDialogService } from 'src/app/_services/banner-dialog.service';

@Component({
  selector: 'app-banner-dialog-card',
  templateUrl: './banner-dialog-card.component.html',
  styleUrls: ['./banner-dialog-card.component.scss']
})
export class BannerDialogCardComponent implements OnInit {
  @Input() row:Slide;
  @Output() deleteId = new EventEmitter();
  constructor(public bannerdialogService:BannerDialogService,
              private router : Router) { }

  ngOnInit(): void {
  }
  populateForm(selectedRecord: Slide) {
    this.bannerdialogService.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['admin/bannerdialog/edit',this.bannerdialogService.formData.id]);
  }
  deleteRow(selectedRow:Slide){
    this.deleteId.emit(selectedRow.id);
  }

}
