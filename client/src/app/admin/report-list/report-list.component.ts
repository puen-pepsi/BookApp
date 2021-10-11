import { Component, OnInit } from '@angular/core';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { ReportList } from 'src/app/_models/reportlist';
import { ReporttopicService } from 'src/app/_services/reporttopic.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  reportlist : ReportList[];
  constructor(private reportTopicService:ReporttopicService) { }

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.reportTopicService.getAllReport().subscribe(res=> {
      this.reportlist = res;
    })
  }
  onDelete(id:number)
  {
    this.reportTopicService.deleteReport(id)
    .subscribe(
      res=>{
         this.load();
      },
      err=>{console.log(err)}
    )
  }
}
