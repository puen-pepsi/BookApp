import { Component, OnInit } from '@angular/core';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { TitleName } from 'src/app/_models/titlename.model';
import { TitlenameService } from 'src/app/_services/titlename.service';

@Component({
  selector: 'app-titlename',
  templateUrl: './titlename.component.html',
  styleUrls: ['./titlename.component.scss']
})
export class TitlenameComponent implements OnInit {
  activitiesType = ActivitiesType;
  constructor(public titlenameService :TitlenameService) { }

  ngOnInit(): void {
    // this.titlenameService.refreshList();
    this.titlenameService.refreshList();
  }
  populateForm(selectedRecord: TitleName) {
    this.titlenameService.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     console.log(id);
     this.titlenameService.deletetitlename(id)
     .subscribe(
       res=>{
          this.titlenameService.refreshList();
       },
       err=>{console.log(err)}
     )
   }

}
