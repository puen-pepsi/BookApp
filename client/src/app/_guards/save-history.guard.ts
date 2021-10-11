import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShowStoryService } from '../show-story/show-story.service';
import { ShowTChapterComponent } from '../show-story/show-tchapter/show-tchapter.component';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class SaveHistoryGuard implements CanDeactivate<unknown> {
  user:User;
  constructor(private showstoryService:ShowStoryService,
              private accountService:AccountService
    ){
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);

    }
  canDeactivate(
    component: ShowTChapterComponent): Observable<boolean> |  boolean  {
      // console.log(component.current);
      // console.log(component.storyname);
      if(component.current == undefined)return true;
      if(this.user){
          this.showstoryService.addHistoryUser(component.storyname,component.current)
        .subscribe(res => console.log(res));
      }
    return true;
  }
  
}
