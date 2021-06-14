import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowDetailedResolver } from '../_resolvers/show-detailed.resolver';
import { ShowTChapterComponent } from './show-tchapter/show-tchapter.component';
import { ShowStoryComponent } from './show-story.component';

const routes : Routes =[
    {path :'',
    component:ShowListComponent},
    {path :':storyname',
    component:ShowDetailComponent,
      resolve:{showstory:ShowDetailedResolver},
      data:{breadcrumb:{alias:'detial'}},
    },    
    {path :':storyname/chapters',
    component:ShowTChapterComponent
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
