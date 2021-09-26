import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Slide } from 'src/app/_models/slide.model';
import { SlideService } from 'src/app/_services/slide.service';
@Component({
  selector: 'app-slide-card',
  templateUrl: './slide-card.component.html',
  styleUrls: ['./slide-card.component.scss']
})
export class SlideCardComponent implements OnInit {
  @Input() row:Slide;
  @Output() deleteId = new EventEmitter();
  constructor(public slideService:SlideService,
              private router : Router) { }

  ngOnInit(): void {
  }
  populateForm(selectedRecord: Slide) {
    this.slideService.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['slide/edit',this.slideService.formData.id]);
  }
  deleteRow(selectedRow:Slide){
    console.log(selectedRow.id)
    this.deleteId.emit(selectedRow.id);
  }

}
