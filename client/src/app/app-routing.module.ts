import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detialed.resolver';
import { StoryComponent } from './story/story.component';
import { LibraryComponent } from './show-story/library/library.component';
import { ShowStoryComponent } from './show-story/show-story.component';
import { HistoryComponent } from './show-story/library/history/history.component';
const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children: [
      {path:'members',component:MemberListComponent,
        // data:{breadcrumb:'Members'}
      },
      {path:'members/:username',component:MemberDetailComponent,
          // data:{ breadcrumb: (data: any) => `${data.member.username}` },
          resolve:{member:MemberDetailedResolver}
      },
      {path:'member/edit',component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      {path:'lists',component:ListsComponent},
      {path:'library',component:LibraryComponent,
        // data:{breadcrumb:'My Library'}
      },
      {path:'mystory',component:StoryComponent,
        // data:{breadcrumb:'My Stories'}
      },
      {
        path: 'stories',component:ShowStoryComponent, loadChildren: () => import('./show-story/show-story.module').then(mod => mod.ShowStoryModule),
        // data: { breadcrumb: 'Stories' }
      },

      // {path:'stories',
      //   component:ShowstoryComponent,data:{breadcrumb:'Stories'},
      //   children:[
      //     {path :'',
      //     component:ShowListComponent},
      //     {path :':storyname',
      //     component:ShowDetailComponent,data:{breadcrumb:{alias:'detial'}},
      //       resolve:{showstory:ShowDetailedResolver},
      //     },    
      //     {path :':storyname/chapters',
      //     component:ShowTChapterComponent
      //     },
      //   ]
      // },
      {path:'messages',component:MessagesComponent,
          // data:{breadcrumb:'Messages'}
        },
      {path:'admin',component:AdminPanelComponent,canActivate: [AdminGuard],
          // data:{breadcrumb:'admin'}
      },
    ]  
  },
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
    scrollOffset: [0, 64+16], 
    // onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
