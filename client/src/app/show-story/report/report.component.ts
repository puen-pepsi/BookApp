import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {  
  @Input() reportType: string;
  @Input() reportId: number;
  @Output() message = new EventEmitter<any>();
  
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { 
             comment: '',
             reportId:this.reportId,
             reportType:this.reportType,
             reportTopic:'' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      
       if(result !== false){
          if(!(result.reportTopic == '' && result.comment == '')){
            this.message.emit(result);
          }
       }     
    });
  }

}
