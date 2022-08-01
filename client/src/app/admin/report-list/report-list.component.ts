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
      console.log(this.reportlist)
    })
  }
  onDelete(id:number)
  {
    var report =  this.reportlist.findIndex( r => r.id == id);
    //delete list report
    // this.reportTopicService.deleteReport(id)
    // .subscribe(
    //   res=>{
    //      this.load();
    //   },
    //   err=>{console.log(err)}
    // )
    //delete comment report
    this.reportTopicService.deleteComment(this.reportlist[report].reportId)
    .subscribe(
      res => {
        this.reportTopicService.deleteReport(id).subscribe( res => {
          this.load();
        })
      }
    )
    //---reportType => storyName || "comment"
    //delet story from report
  }
}
