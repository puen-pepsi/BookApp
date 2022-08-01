import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportTopic } from 'src/app/_models/reporttopic';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  baseUrl = environment.apiUrl;
  reportTopic:string[]=[];

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.http.get<ReportTopic[]>(this.baseUrl + 'reporttopic').subscribe(
      (res) => {
        this.reportTopic = res.map(res => res.reportTopic);
      }
    );
  }

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }

}
