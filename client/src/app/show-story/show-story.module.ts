import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowTChapterComponent } from './show-tchapter/show-tchapter.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowChaptersComponent } from './show-chapters/show-chapters.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { ShowAChapterComponent } from './show-tchapter/show-achapter/show-achapter.component';
import { CommentComponent } from './comment/comment/comment.component';
import { ShowStoryRoutingModule } from './show-story-routing.module';
import { SharedModule } from '../_modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowStoryComponent } from './show-story.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { StarRatingShowComponent } from './star-rating/star-rating-show/star-rating-show.component';
import { ScrollSpyModule } from 'ng-spy';
import { ReplyComponent } from './comment/reply/reply.component';
import { ReplyListComponent } from './comment/reply-list/reply-list.component';
import { NavSidebarComponent } from './show-tchapter/nav-sidebar.component';
import { LibraryComponent } from './library/library.component';
import { HistoryComponent } from './library/history/history.component';
import { LibraryCardComponent } from './library/library-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoryCardComponent } from './library/history/history-card.component';
import { LikeComponent } from './Like/like.component';
import { DialogComponent } from './comment/comment-dialog/dialog/dialog.component';
import { CommentPopComponent } from './comment/comment-dialog/comment-pop.component';
import { ShowCommentChapterComponent } from './show-comment-chapter/show-comment-chapter.component';

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
    ReplyListComponent,
    NavSidebarComponent,
    LibraryComponent,
    HistoryComponent,
    LibraryCardComponent,
    HistoryCardComponent,
    LikeComponent,
    CommentPopComponent,
    DialogComponent,
    ShowCommentChapterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShowStoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollSpyModule,
    NgbModule
  ],
  exports: [
    ShowCardComponent,
    LikeComponent
  ]
})
export class ShowStoryModule { }
