import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cover } from 'src/app/_models/cover.model';
import { CoverService } from 'src/app/_services/cover.service';

@Component({
  selector: 'app-cover-card',
  templateUrl: './cover-card.component.html',
  styleUrls: ['./cover-card.component.scss']
})
export class CoverCardComponent implements OnInit {
  @Input() row:Cover;
  @Output() deleteId = new EventEmitter();
  constructor(public coverService:CoverService,
              private router : Router) { }

  ngOnInit(): void {
  }
  populateForm(selectedRecord: Cover) {
    this.coverService.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['cover/edit',this.coverService.formData.id]);
  }
  deleteRow(selectedRow:Cover){
    console.log(selectedRow.id)
    this.deleteId.emit(selectedRow.id);
  }
}
