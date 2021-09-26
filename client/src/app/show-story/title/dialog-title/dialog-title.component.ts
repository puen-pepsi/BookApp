import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-title',
  templateUrl: './dialog-title.component.html',
  styleUrls: ['./dialog-title.component.scss']
})
export class DialogTitleComponent implements OnInit {
  baseUrl = environment.apiUrl;
  reportTopic:string[]=[];

  constructor(public dialogRef: MatDialogRef<DialogTitleComponent>,
    private http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
