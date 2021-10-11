import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Slide } from 'src/app/_models/slide.model';
import { Slide2Service } from 'src/app/_services/slide2.service';

@Component({
  selector: 'app-slide2-card',
  templateUrl: './slide2-card.component.html',
  styleUrls: ['./slide2-card.component.scss']
})
export class Slide2CardComponent implements OnInit {
  @Input() row:Slide;
  @Output() deleteId = new EventEmitter();
  constructor(public slide2Service:Slide2Service,
              private router : Router){ }

  ngOnInit(): void {
  }
  populateForm(selectedRecord: Slide) {
    this.slide2Service.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['admin/slide2/edit',this.slide2Service.formData.id]);
  }
  deleteRow(selectedRow:Slide){
    this.deleteId.emit(selectedRow.id);
  }
}
