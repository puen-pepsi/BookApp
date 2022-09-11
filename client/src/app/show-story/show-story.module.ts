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
import { ShowCommentChapterComponent } from './show-comment-chapter/show-comment-chapter.component';
import { ShowTableContentComponent } from './show-table-content/show-table-content.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReportComponent } from './report/report.component';
import { DialogComponent } from './report/dialog/dialog.component';
import { ShowListHorizontalComponent } from './show-list-horizontal/show-list-horizontal.component';
import { ShowViewComponent } from './show-view/show-view.component';
import { LabelNameComponent } from './label-name/label-name.component';
import { FollowstoryComponent } from './followstory/followstory.component';
import { FollowAuthorComponent } from './follow-author/follow-author.component';
import { ShowListVerticalComponent } from './show-list-vertical/show-list-vertical.component';
import { ShowCardVerticalComponent } from './show-card-vertical/show-card-vertical.component';
import { ShowRandomComponent } from './show-random/show-random.component';
import { ShowSlideComponent } from './show-slide/show-slide.component';
import { TitleComponent } from './title/title.component';
import { DialogTitleComponent } from './title/dialog-title/dialog-title.component';
import { ShowCardAllComponent } from './show-card-all/show-card-all.component';
import { ShowListAllComponent } from './show-list-all/show-list-all.component';
import { ShowCarouselComponent } from './show-carousel/show-carousel.component';
import { HistoryCardListComponent } from './library/history/history-card-list/history-card-list.component';
import { HistoryCarouselComponent } from './library/history/history-carousel/history-carousel.component';
import { ShowNovelComponent } from './show-novel/show-novel.component';
import { ShowTagComponent } from './show-tag/show-tag.component';
import { ShowTagCardComponent } from './show-tag-card/show-tag-card.component';
import { ShowTopRankComponent } from './show-top-rank/show-top-rank.component';
import { RecentChapterComponent } from './recent-chapter/recent-chapter.component';
import { RecentCardComponent } from './recent-chapter/recent-card/recent-card.component';
import { ShowTopCardComponent } from './show-top-rank/show-top-card/show-top-card.component';
import { DialogAdsComponent } from './show-tchapter/dialog-ads/dialog-ads.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { ShowTopSpecialComponent } from './show-top-special/show-top-special.component';
import { CardTopComponent } from './show-top-special/card-top/card-top.component';
import { MatCarouselModule } from 'ng-mat-carousel';
import { RecentListComponent } from './recent-chapter/recent-list/recent-list.component';
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
    DialogComponent,
    ShowCommentChapterComponent,
    ShowTableContentComponent,
    ReportComponent,
    DialogComponent,
    ShowListHorizontalComponent,
    ShowViewComponent,
    LabelNameComponent,
    FollowstoryComponent,
    FollowAuthorComponent,
    ShowListVerticalComponent,
    ShowCardVerticalComponent,
    ShowRandomComponent,
    ShowSlideComponent,
    TitleComponent,
    DialogTitleComponent,
    ShowCardAllComponent,
    ShowListAllComponent,
    ShowCarouselComponent,
    HistoryCardListComponent,
    HistoryCarouselComponent,
    ShowNovelComponent,
    ShowTagComponent,
    ShowTagCardComponent,
    ShowTopRankComponent,
    RecentChapterComponent,
    RecentCardComponent,
    ShowTopCardComponent,
    DialogAdsComponent,
    MemberAreaComponent,
    ShowTopSpecialComponent,
    CardTopComponent,
    RecentListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShowStoryRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollSpyModule,
    NgbModule,
    ScrollingModule,
    NgxSpinnerModule,
    MatCarouselModule
  ],
  exports: [
    ShowCardComponent,
    LikeComponent,
    FollowAuthorComponent,
    LabelNameComponent,
    TitleComponent,
    DialogTitleComponent,
    ShowCarouselComponent,
    HistoryComponent,
    ShowTopRankComponent,
    RecentChapterComponent,
    RecentCardComponent,
    ShowTopCardComponent
  ]
})
export class ShowStoryModule { }
