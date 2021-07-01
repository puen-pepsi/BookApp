import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-comment-pop',
  templateUrl: './comment-pop.component.html',
  styleUrls: ['./comment-pop.component.css']
})
export class CommentPopComponent{
@Input() username :string;
@Output() message = new EventEmitter();
  comment: string;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { name: this.username, conment: this.comment }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.comment = result;
      if( this.comment !== undefined){
        this.message.emit(this.comment);
      }      
    });
  }
}
