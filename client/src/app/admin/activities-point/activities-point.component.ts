import { Component, OnInit } from '@angular/core';
import { ActivitiesPoint } from 'src/app/_models/activitiespoint.model';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { ActivitiesPointService } from 'src/app/_services/activities-point.service';

@Component({
  selector: 'app-activities-point',
  templateUrl: './activities-point.component.html',
  styleUrls: ['./activities-point.component.scss']
})
export class ActivitiesPointComponent implements OnInit {
  activitiesType = ActivitiesType;
  constructor(public activitiesPointService :ActivitiesPointService) { }

  ngOnInit(): void {
    // this.activitiesPointService.refreshList();
    this.activitiesPointService.refreshList();
  }
  populateForm(selectedRecord: ActivitiesPoint) {
    this.activitiesPointService.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     this.activitiesPointService.deleteActivitiesPoint(id)
     .subscribe(
       res=>{
          this.activitiesPointService.refreshList();
       },
       err=>{console.log(err)}
     )
   }
}
