import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { PreventUnsavedChangesGuard } from '../_guards/prevent-unsaved-changes.guard';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryComponent } from './story.component';

const routes: Routes = [
      {path:'',component:StoryComponent},
      {path:'create',component:StoryFormComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      // {path:'edit/:storyName',component:StoryFormComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      {path:'edit/:id',component:StoryFormComponent,canDeactivate:[PreventUnsavedChangesGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule { }
