import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/_models/status.model';
import { StatusService } from 'src/app/_services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(public statusService:StatusService) { }

  ngOnInit(): void {
    this.statusService.refreshList();
  }
  populateForm(selectedRecord: Status) {
    this.statusService.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     this.statusService.deleteStatus(id)
     .subscribe(
       res=>{
          this.statusService.refreshList();
       },
       err=>{console.log(err)}
     )
   }
}
