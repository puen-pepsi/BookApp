import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appGetRole]'
})
export class GetRoleDirective{
    @Input() appGetRole:string[];
  user:User;
  constructor(private viewContainerRef:ViewContainerRef,
      private templateRef:TemplateRef<any>,
      private accountService:AccountService) { 
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
          this.user = user;
        })
      }
  ngOnInit():void{
    //clear view if no roles
    // if (!this.user?.roles || this.user == null){
    //   this.viewContainerRef.clear();
    //   return;
    // }
    if(this.user?.roles.some(r => this.appGetRole.includes(r))){
        this.viewContainerRef.clear();
    }else{
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }    
}