import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowDetailedResolver } from '../_resolvers/show-detailed.resolver';
import { ShowTChapterComponent } from './show-tchapter/show-tchapter.component';
import { ShowStoryComponent } from './show-story.component';
import { SaveHistoryGuard } from '../_guards/save-history.guard';

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
    {path:'',component:ShowListComponent},
    {path:':storyname',
            component:ShowDetailComponent,
            // data: { breadcrumb: (data: any) => `${data.showstory.storyName}` },
            resolve:{showstory:ShowDetailedResolver},
    },    
    {path :':storyname/chapters',
            component:ShowTChapterComponent,canDeactivate:[SaveHistoryGuard]
    },
  ]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShowStoryRoutingModule { }
