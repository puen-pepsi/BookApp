import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowDetailedResolver } from '../_resolvers/show-detailed.resolver';
import { ShowTChapterComponent } from './show-tchapter/show-tchapter.component';
import { SaveHistoryGuard } from '../_guards/save-history.guard';
import { ShowListVerticalComponent } from './show-list-vertical/show-list-vertical.component';
import { ShowListAllComponent } from './show-list-all/show-list-all.component';
import { ShowNovelComponent } from './show-novel/show-novel.component';
import { ShowTagComponent } from './show-tag/show-tag.component';
import { RecentChapterComponent } from './recent-chapter/recent-chapter.component';
import { ShowTopSpecialComponent } from './show-top-special/show-top-special.component';
import { RecentListComponent } from './recent-chapter/recent-list/recent-list.component';

const routes : Routes =[
    // {path :'',component:ShowListComponent,
    //   children:[
    //     {path :':storyname',
    //         component:ShowDetailComponent,


    //         resolve:{showstory:ShowDetailedResolver}
    //         },
    //     {path :':storyname/chapters',
    //     component:ShowTChapterComponent
    //     },
    //   ]
    // },
    {path:'all/:storytype',component:ShowListAllComponent},
    {path:'list',component:ShowListVerticalComponent,data:{storytype:'novel'}},
    // {path:'topviews',component:ShowViewComponent},
    {path:'topviews',component:ShowTopSpecialComponent},
    {path:'recent',component:RecentChapterComponent,data:{showAll:'all'}},
    // {path:'recent',component:RecentListComponent},
    //{path:'',component:ShowStoryComponent},
    {path:'',component:ShowNovelComponent,data:{storytype:'novel'}},
    {path:':storyname',
            component:ShowDetailComponent,
            // data: { breadcrumb: (data: any) => `${data.showstory.storyName}` },
            resolve:{showstory:ShowDetailedResolver}
    },
    {path :':storyname/chapters',
           component:ShowTChapterComponent,canDeactivate:[SaveHistoryGuard]
    },
    {path :'tag/:tagname',component:ShowTagComponent},
  ]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShowStoryRoutingModule { }
