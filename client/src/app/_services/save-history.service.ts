import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../Modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SaveHistoryService {
  bsModalRef : BsModalRef;
  constructor(private modalService:BsModalService) { }
  confirm(title = 'Confirmation',
  message = 'Do you want to save History?',
  btnOkText = 'Save',
  btnCancelText = 'Discard') :Observable<boolean> {
    const config = {
      initialState:{
        title,
        message,
        btnOkText,
        btnCancelText
      }
    }
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent,config);
    return new Observable<boolean>(this.getResult());
  }
    private getResult(){
      return (observer) => {
        const subscription = this.bsModalRef.onHidden.subscribe(()=>{
          observer.next(this.bsModalRef.content.result);
          observer.complete();
        });
        return {
          unsubscribe() {
            subscription.unsubscribe();
          }
        }
      }
    }
}
