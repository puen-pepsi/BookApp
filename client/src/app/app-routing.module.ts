import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detialed.resolver';
import { StoryComponent } from './story/story.component';
import { LibraryComponent } from './show-story/library/library.component';
import { HistoryComponent } from './show-story/library/history/history.component';
import { ShowListComponent } from './show-story/show-list/show-list.component';
import { StoryFormComponent } from './story/story-form/story-form.component';
import { ChattoComponent } from './chat/chatto.component';
import { NewsListComponent } from './News/news-list/news-list.component';
import { NewsFormComponent } from './news/news-form/news-form.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { MemberProfileEditComponent } from './members/member-profile-edit/member-profile-edit.component';
import { CoverComponent } from './admin/cover/cover.component';
import { CoverFormComponent } from './admin/cover/cover-form/cover-form.component';
import { CoverListComponent } from './admin/cover/cover-list/cover-list.component';
import { MemberPointComponent } from './members/member-point/member-point.component';
import { SlideFormComponent } from './admin/Slide/slide-form/slide-form.component';
import { SlideListComponent } from './admin/Slide/slide-list/slide-list.component';
import { ShowSlideComponent } from './show-story/show-slide/show-slide.component';
import { HomeComponent } from './home/home.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { MemberListCarouselComponent } from './members/member-list-carousel/member-list-carousel.component';
import { RecentChapterComponent } from './show-story/recent-chapter/recent-chapter.component';
import { PaypalComponent } from './admin/paypal/paypal.component';
import { Slide2ListComponent } from './admin/slide2/slide2-list/slide2-list.component';
import { Slide2FormComponent } from './admin/slide2/slide2-form/slide2-form.component';
import { IntoduceComponent } from './home/intoduce/intoduce.component';
import { TermOfServiceComponent } from './term-of-service/term-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    // canActivate: [AuthGuard],
    children: [


      // {path:'member/edit',component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      {path:'home',component:HomeComponent},
      {path:'member/edit',component:MemberProfileEditComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      {path:'lists',component:ListsComponent},
      {path:'library',component:LibraryComponent},
      {path:'memberlist',component:MemberListCarouselComponent},
      {path:'mystory',component:StoryComponent},
      {path:'mystory/create',component:StoryFormComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      {path:'mystory/edit/:storyName',component:StoryFormComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      {path:'messages',component:MessagesComponent,canActivate:[AuthGuard]},
      {path:'aboutus',component:IntoduceComponent},
      {path:'termofservice',component:TermOfServiceComponent},
      {path:'privacypolicy',component:PrivacyPolicyComponent},

      // {path:'admin',component:AdminPanelComponent,canActivate: [AdminGuard],
      //     // data:{breadcrumb:'admin'}
      // },
      {
        path: 'admin',
         loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
        // data: { breadcrumb: 'Stories' }
      },
      {path:'paypal',component:PaypalComponent},
      {path:'recent',component:RecentChapterComponent},
      {path:'slideshow',component:ShowSlideComponent},
      {path:'members',component:MemberListComponent,
        // data:{breadcrumb:'Members'}
      },
      // {path:'members/:username',component:MemberDetailComponent,
      //     // data:{ breadcrumb: (data: any) => `${data.member.username}` },
      //     resolve:{member:MemberDetailedResolver}
      // },
      {path:'members/:username',component:MemberProfileComponent,
          // data:{ breadcrumb: (data: any) => `${data.member.username}` },
          resolve:{member:MemberDetailedResolver}
      },
      {path:'activities',component:MemberPointComponent},
      {
        path: 'stories',
         loadChildren: () => import('./show-story/show-story.module').then(mod => mod.ShowStoryModule),
        // data: { breadcrumb: 'Stories' }
      },
      {
        path: 'manga',component:ShowListComponent,
        data:{storytype:'manga'},
      },
      {path:'news',component:NewsListComponent},
      {path:'news/create',component:NewsFormComponent,data:{type:'create'}},
      {path:'news/edit/:id',component:NewsFormComponent,data:{type:'edit'}},
      {path:'news/:id',component:NewsDetailComponent},
      {
        path:'chatto',component:ChattoComponent,canActivate:[AuthGuard]
      },
    ]
  },
  // { path: '**', redirectTo: 'authentication/login' },

  {path:'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  {path:'history',component:HistoryComponent},
  {path:'errors',component:TestErrorsComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'},

  // {path:'stories/:storyname',component:ShowDetailComponent,resolve:{showstory:ShowDetailedResolver}},
  // {path:'chapters',component:ShowTChapterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    //scrollOffset: [0, 150], // [x, y] - adjust scroll offset
    // scrollOffset: [0, 90],
    scrollOffset: [0, 64],
    // onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
