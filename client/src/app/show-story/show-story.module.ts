import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowTChapterComponent } from './show-tchapter/show-tchapter.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowChaptersComponent } from './show-chapters/show-chapters.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { ShowAChapterComponent } from './show-achapter/show-achapter.component';
import { CommentComponent } from './comments/comment/comment.component';
import { ShowStoryRoutingModule } from './show-story-routing.module';
import { SharedModule } from '../_modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowStoryComponent } from './show-story.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { StarRatingShowComponent } from './star-rating/star-rating-show/star-rating-show.component';
import { ScrollSpyModule } from 'ng-spy';
import { ReplyComponent } from './comments/reply/reply.component';
import { ReplyListComponent } from './comments/reply-list/reply-list.component';


@NgModule({
  declarations: [
    ShowListComponent,
    ShowTChapterComponent,
    ShowDetailComponent,
    ShowChaptersComponent,
    ShowCardComponent,
    ShowAChapterComponent,
    CommentComponent,
    CommentListComponent,
    ReplyComponent,
    ShowStoryComponent,
    StarRatingShowComponent,
    ReplyComponent,
    ReplyListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShowStoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollSpyModule
  ],
  exports: [
    ShowCardComponent
  ]
})
export class ShowStoryModule { }
