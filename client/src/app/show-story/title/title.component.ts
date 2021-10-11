import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTitleComponent } from './dialog-title/dialog-title.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent  {
  @Input() userId:number;
  @Input() userName:string;
  @Input() reportType: string;
  @Input() reportId: number;
  @Output() message = new EventEmitter();
  constructor(public dialogtitle: MatDialog) { }
  openDialog(): void {
    let dialogRef = this.dialogtitle.open(DialogTitleComponent, {
      width: '400px',
      data: { 
             comment: '',
             }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
       if(result !== undefined){
          if(!(result.comment == '')){
            this.message.emit({
              data:result.comment,
              userid:this.userId,
              username:this.userName
            });
          }
       }     
    });
  }
}
