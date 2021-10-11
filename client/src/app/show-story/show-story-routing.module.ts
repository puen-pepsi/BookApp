import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowDetailedResolver } from '../_resolvers/show-detailed.resolver';
import { ShowTChapterComponent } from './show-tchapter/show-tchapter.component';
import { SaveHistoryGuard } from '../_guards/save-history.guard';
import { ShowListVerticalComponent } from './show-list-vertical/show-list-vertical.component';
import { ShowListAllComponent } from './show-list-all/show-list-all.component';
import { ShowCarouselComponent } from './show-carousel/show-carousel.component';
import { ShowNovelComponent } from './show-novel/show-novel.component';
import { ShowTagComponent } from './show-tag/show-tag.component';
import { ShowViewComponent } from './show-view/show-view.component';
import { RecentChapterComponent } from './recent-chapter/recent-chapter.component';
import { AuthGuard } from '../_guards/auth.guard';

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
    {path:'topviews',component:ShowViewComponent},
    {path:'recent',component:RecentChapterComponent},
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
