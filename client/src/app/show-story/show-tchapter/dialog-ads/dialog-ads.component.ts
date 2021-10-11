import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-ads',
  templateUrl: './dialog-ads.component.html',
  styleUrls: ['./dialog-ads.component.scss']
})
export class DialogAdsComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogAdsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;  
   }

  ngOnInit(): void {
  }

}
