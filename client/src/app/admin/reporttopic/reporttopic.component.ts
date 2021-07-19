import { Component, OnInit } from '@angular/core';
import { ReportTopic } from 'src/app/_models/reporttopic';
import { ReporttopicService } from 'src/app/_services/reporttopic.service';

@Component({
  selector: 'app-reporttopic',
  templateUrl: './reporttopic.component.html',
  styleUrls: ['./reporttopic.component.css']
})
export class ReporttopicComponent implements OnInit {

  constructor(public reportTopicSersvice  :ReporttopicService) { }

  ngOnInit(): void {
    this.reportTopicSersvice.refreshList();
  }
  populateForm(selectedRecord: ReportTopic) {
    this.reportTopicSersvice.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     console.log(id);
     this.reportTopicSersvice.deleteTags(id)
     .subscribe(
       res=>{
          this.reportTopicSersvice.refreshList();
       },
       err=>{console.log(err)}
     )
   }
}
