import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './Modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './Modals/confirm-dialog/confirm-dialog.component';
import { GenreComponent } from './admin/genre/genre.component';
import { GenreFormComponent } from './admin/genre/genre-form/genre-form.component';
import { StatusComponent } from './admin/status/status.component';
import { StatusFormComponent } from './admin/status/status-form/status-form.component';
import { StoryComponent } from './story/story.component';
import { StoryListComponent } from './story/story-list/story-list.component';
import { StoryFormComponent } from './story/story-form/story-form.component';
import { LanguageComponent } from './admin/language/language.component';
import { LanguageFormComponent } from './admin/language/language-form/language-form.component';
import { StoryFormImageComponent } from './story/story-form-image/story-form-image.component';
import { StorychapterComponent } from './story/storychapter/storychapter.component';
import { ChapterFormComponent } from './story/storychapter/chapter-form/chapter-form.component';
import { ChapterListComponent } from './story/storychapter/chapter-list/chapter-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { ShowListComponent } from './ShowStory/show-list/show-list.component';
// import { ShowCardComponent } from './ShowStory/show-card/show-card.component';
// import { ShowDetailComponent } from './ShowStory/show-detail/show-detail.component';
// import { ShowChaptersComponent } from './ShowStory/show-chapters/show-chapters.component';
import {MaterialModule} from './material.module';
import {TagComponent} from './admin/tag/tag.component'
import { TagFormComponent } from './admin/tag/tag-form/tag-form.component';
// import { StarRatingComponent } from './show-story/star-rating/star-rating/star-rating.component';
// import { StarRatingShowComponent } from './show-story/star-rating/star-rating-show/star-rating-show.component';
// import { ShowAChapterComponent } from './ShowStory/show-achapter/show-achapter.component';
// import { ShowTChapterComponent } from './ShowStory/show-tchapter/show-tchapter.component';
// import { ShowstoryComponent } from './ShowStory/showstory.component';
// import { CommentComponent } from './show-story/comments/comment/comment.component';
// import { CommentListComponent } from './show-story/comments/comment-list/comment-list.component';
// import { ReplyComponent } from './show-story/comments/reply/reply.component';
// import { ReplyListComponent } from './show-story/comments/reply-list/reply-list.component';
// import { CommentsComponent } from './show-story/comments/comments.component';
import { LibraryComponent } from './library/library.component';
import { ScrollSpyModule } from 'ng-spy';
import { SectionHeaderComponent } from './section-header/section-header.component';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { ShowStoryModule } from './show-story/show-story.module';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    GenreComponent,
    GenreFormComponent,
    StatusComponent,
    StatusFormComponent,
    StoryComponent,
    StoryListComponent,
    StoryFormComponent,
    LanguageComponent,
    LanguageFormComponent,
    StoryFormImageComponent,
    StorychapterComponent,
    ChapterFormComponent,
    ChapterListComponent,
    // ShowListComponent,
    // ShowCardComponent,
    // ShowDetailComponent,
    // ShowChaptersComponent,
    // StarRatingComponent,
    TagComponent,
    TagFormComponent,
    // StarRatingShowComponent,
    // ShowAChapterComponent,
    // ShowTChapterComponent,
    // ShowstoryComponent,
    // CommentComponent,
    // CommentListComponent,
    // ReplyComponent,
    // ReplyListComponent,
    // CommentsComponent,
    LibraryComponent,
    SectionHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    CKEditorModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollSpyModule,
    BreadcrumbModule,
    ShowStoryModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
