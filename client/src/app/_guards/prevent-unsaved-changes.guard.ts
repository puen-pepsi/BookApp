import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { StoryFormComponent } from '../story/story-form/story-form.component';
import { StoryComponent } from '../story/story.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService:ConfirmService){}
  canDeactivate(component: MemberEditComponent):Observable<boolean> | boolean {
    if(component.editForm.dirty){
      return this.confirmService.confirm()
    }
    return true;
  }
}