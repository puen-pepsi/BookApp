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
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
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
import { MaterialModule} from './material.module';
import { TagComponent} from './admin/tag/tag.component'
import { TagFormComponent } from './admin/tag/tag-form/tag-form.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { ShowStoryModule } from './show-story/show-story.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthorStoryComponent } from './members/member-detail/author-story/author-story.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider ,FacebookLoginProvider} from 'angularx-social-login';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChattoComponent } from './chat/chatto.component';
import { ReporttopicComponent } from './admin/reporttopic/reporttopic.component';
import { ReporttopicFormComponent } from './admin/reporttopic/reporttopic-form/reporttopic-form.component';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './News/news-list/news-list.component';
import { NewsCardComponent } from './news/news-card/news-card.component';
import { NewsFormComponent } from './news/news-form/news-form.component';
import { NewsImageComponent } from './news/news-form/news-image/news-image.component';
import { RankComponent } from './admin/rank/rank.component';
import { RankFormComponent } from './admin/rank/rank-form/rank-form.component';
import { ActivitiesPointComponent } from './admin/activities-point/activities-point.component';
import { ActivitiesPointFormComponent } from './admin/activities-point/activities-point-form/activities-point-form.component';
import { TitlenameComponent } from './admin/titlename/titlename.component';
import { TitlenameFormComponent } from './admin/titlename/titlename-form/titlename-form.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { MemberProfileEditComponent } from './members/member-profile-edit/member-profile-edit.component';
import { CoverComponent } from './admin/cover/cover.component';
import { CoverFormComponent } from './admin/cover/cover-form/cover-form.component';
import { CoverImageComponent } from './admin/cover/cover-form/cover-image/cover-image.component';
import { CoverListComponent } from './admin/cover/cover-list/cover-list.component';
import { CoverCardComponent } from './admin/cover/cover-card/cover-card.component';
import { PhotoEditorSingleComponent } from './members/photo-editor-single/photo-editor-single.component';
import { LabelTagComponent } from './show-story/label-name/label-tag/label-tag.component';
import { ReportListComponent } from './admin/report-list/report-list.component';
import { MemberPointComponent } from './members/member-point/member-point.component';
import { SlideComponent } from './admin/slide/slide.component';
import { SlideCardComponent } from './admin/Slide/slide-card/slide-card.component';
import { SlideFormComponent } from './admin/Slide/slide-form/slide-form.component';
import { SlideListComponent } from './admin/Slide/slide-list/slide-list.component';
import { SlideFormImageComponent } from './admin/Slide/slide-form/slide-form-image/slide-form-image.component';
import { TitleEditorComponent } from './members/title-editor/title-editor.component';
import { NullWithDefaultPipe } from './null-with-default.pipe';
import { IntoduceComponent } from './home/intoduce/intoduce.component';
import { NewsCarouselComponent } from './news/news-carousel/news-carousel.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { MemberListCarouselComponent } from './members/member-list-carousel/member-list-carousel.component';
import { PaypalComponent } from './admin/paypal/paypal.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
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
    MemberMessagesComponent,
    AdminPanelComponent,
    // HasRoleDirective,
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
    TagComponent,
    TagFormComponent,
    SectionHeaderComponent,
    HeaderComponent,
    SidenavListComponent,
    AuthorStoryComponent,
    FooterComponent,
    ChattoComponent,
    ReporttopicComponent,
    ReporttopicFormComponent,
    NewsComponent,
    NewsListComponent,
    NewsCardComponent,
    NewsFormComponent,
    NewsImageComponent,
    RankComponent,
    RankFormComponent,
    ActivitiesPointComponent,
    ActivitiesPointFormComponent,
    TitlenameComponent,
    TitlenameFormComponent,
    MemberProfileComponent,
    MemberProfileEditComponent,
    CoverComponent,
    CoverFormComponent,
    CoverImageComponent,
    CoverListComponent,
    CoverCardComponent,
    PhotoEditorSingleComponent,
    LabelTagComponent,
    ReportListComponent,
    MemberPointComponent,
    SlideComponent,
    SlideCardComponent,
    SlideFormComponent,
    SlideListComponent,
    SlideFormImageComponent,
    TitleEditorComponent,
    NullWithDefaultPipe,
    IntoduceComponent,
    NewsCarouselComponent,
    NewsDetailComponent,
    MemberListCarouselComponent,
    PaypalComponent,
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
    ShowStoryModule,
    AuthenticationModule,
    SocialLoginModule,
    InfiniteScrollModule,
    ScrollingModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorHandlerService,
    //   multi: true
    // },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '798468934206-b5n7mrr7kld0pmjasn6neuntoounhuq5.apps.googleusercontent.com'
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider(
          //     '951482782076972'
          //   )
          // }
        ],
      } as SocialAuthServiceConfig
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
