import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoryComponent } from './story.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryFormImageComponent } from './story-form-image/story-form-image.component';
import { StorychapterComponent } from './storychapter/storychapter.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../_modules/shared.module';
import { ChapterFormComponent } from './storychapter/chapter-form/chapter-form.component';
import { ChapterListComponent } from './storychapter/chapter-list/chapter-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    StoryComponent,
    StoryListComponent,
    StoryFormComponent,
    StoryFormImageComponent,
    StorychapterComponent,
    ChapterFormComponent,
    ChapterListComponent,

  ],
  imports: [
    CommonModule,
    StoryRoutingModule,
    MaterialModule,
    SharedModule,
    CKEditorModule,
  ],
  exports:[
    StoryComponent,
    StoryListComponent,
    StoryFormComponent,
    StoryFormImageComponent,
    StorychapterComponent,
    ChapterFormComponent,
    ChapterListComponent,

  ]
})
export class StoryModule { }
