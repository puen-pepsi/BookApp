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
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './Modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './Modals/confirm-dialog/confirm-dialog.component';
import { StoryComponent } from './story/story.component';
import { StoryListComponent } from './story/story-list/story-list.component';
import { StoryFormComponent } from './story/story-form/story-form.component';
import { StoryFormImageComponent } from './story/story-form-image/story-form-image.component';
import { StorychapterComponent } from './story/storychapter/storychapter.component';
import { ChapterFormComponent } from './story/storychapter/chapter-form/chapter-form.component';
import { ChapterListComponent } from './story/storychapter/chapter-list/chapter-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule} from './material.module';
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
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './News/news-list/news-list.component';
import { NewsCardComponent } from './news/news-card/news-card.component';
import { NewsFormComponent } from './news/news-form/news-form.component';
import { NewsImageComponent } from './news/news-form/news-image/news-image.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { MemberProfileEditComponent } from './members/member-profile-edit/member-profile-edit.component';
import { PhotoEditorSingleComponent } from './members/photo-editor-single/photo-editor-single.component';
import { LabelTagComponent } from './show-story/label-name/label-tag/label-tag.component';
import { MemberPointComponent } from './members/member-point/member-point.component';
import { TitleEditorComponent } from './members/title-editor/title-editor.component';
import { IntoduceComponent } from './home/intoduce/intoduce.component';
import { NewsCarouselComponent } from './news/news-carousel/news-carousel.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { MemberListCarouselComponent } from './members/member-list-carousel/member-list-carousel.component';
import { PaypalComponent } from './admin/paypal/paypal.component';
import { NewsSmallCardComponent } from './news/news-small-card/news-small-card.component';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { AdminModule } from './admin/admin.module';
import { NullWithDefaultPipe } from 'src/pipe/null-with-default.pipe';
import { TermOfServiceComponent } from './term-of-service/term-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AppHttpInterceptor } from './_interceptors/AppHttpInterceptor';
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
    // HasRoleDirective,
    PhotoManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    StoryComponent,
    StoryListComponent,
    StoryFormComponent,
    StoryFormImageComponent,
    StorychapterComponent,
    ChapterFormComponent,
    ChapterListComponent,
    SectionHeaderComponent,
    HeaderComponent,
    SidenavListComponent,
    AuthorStoryComponent,
    FooterComponent,
    ChattoComponent,
    NewsComponent,
    NewsListComponent,
    NewsCardComponent,
    NewsFormComponent,
    NewsImageComponent,
    MemberProfileComponent,
    MemberProfileEditComponent,
    PhotoEditorSingleComponent,
    LabelTagComponent,
    MemberPointComponent,
    TitleEditorComponent,
    IntoduceComponent,
    NewsCarouselComponent,
    NewsDetailComponent,
    MemberListCarouselComponent,
    PaypalComponent,
    NewsSmallCardComponent,
    HomeCarouselComponent,
    NullWithDefaultPipe,
    TermOfServiceComponent,
    PrivacyPolicyComponent
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
    AdminModule
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
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AppHttpInterceptor,
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
