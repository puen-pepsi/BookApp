import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowStoryService } from '../show-story/show-story.service';
import { ShowTChapterComponent } from '../show-story/show-tchapter/show-tchapter.component';

@Injectable({
  providedIn: 'root'
})
export class SaveHistoryGuard implements CanDeactivate<unknown> {
  constructor(private showstoryService:ShowStoryService){}
  canDeactivate(
    component: ShowTChapterComponent): Observable<boolean> |  boolean  {
      console.log(component.current);
      console.log(component.storyname);
      this.showstoryService.addHistoryUser(component.storyname,component.current)
        .subscribe(res => console.log(res));
    return true;
  }
  
}
