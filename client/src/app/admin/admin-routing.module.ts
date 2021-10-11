import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../_guards/admin.guard';
import { ActivitiesPointComponent } from './activities-point/activities-point.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { BannerDialogFormComponent } from './banner-dialog/banner-dialog-form/banner-dialog-form.component';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { BannerFormComponent } from './banner/banner-form/banner-form.component';
import { BannerComponent } from './banner/banner.component';
import { CoverFormComponent } from './cover/cover-form/cover-form.component';
import { CoverListComponent } from './cover/cover-list/cover-list.component';
import { GenreComponent } from './genre/genre.component';
import { LanguageComponent } from './language/language.component';
import { RankComponent } from './rank/rank.component';
import { ReporttopicComponent } from './reporttopic/reporttopic.component';
import { SlideFormComponent } from './Slide/slide-form/slide-form.component';
import { SlideListComponent } from './Slide/slide-list/slide-list.component';
import { Slide2FormComponent } from './slide2/slide2-form/slide2-form.component';
import { Slide2ListComponent } from './slide2/slide2-list/slide2-list.component';
import { StatusComponent } from './status/status.component';
import { TagComponent } from './tag/tag.component';
import { TitlenameComponent } from './titlename/titlename.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { VipUserComponent } from './vip-user/vip-user.component';

const routes: Routes = [
  {path:'',component:AdminPanelComponent,canActivate: [AdminGuard],
    children:[
      {path:'',component:UserManagementComponent},
      {path:'genre',component:GenreComponent},
      {path:'status',component:StatusComponent},
      {path:'language',component:LanguageComponent},
      {path:'tag',component:TagComponent},
      {path:'report',component:ReporttopicComponent},
      {path:'rank',component:RankComponent},
      {path:'activities',component:ActivitiesPointComponent},
      {path:'title',component:TitlenameComponent},
      {path:'vip-user',component:VipUserComponent},
      {path:'slide',component:SlideListComponent},
      {path:'slide/create',component:SlideFormComponent,data:{slidetype:'create'}},
      {path:'slide/edit/:id',component:SlideFormComponent,data:{slidetype:'edit'}},
      {path:'slide2',component:Slide2ListComponent,},
      {path:'slide2/create',component:Slide2FormComponent,data:{slide2type:'create'}},
      {path:'slide2/edit/:id',component:Slide2FormComponent,data:{slide2type:'edit'}},
      {path:'cover',component:CoverListComponent},
      {path:'cover/create',component:CoverFormComponent,data:{covertype:'create'}},
      {path:'cover/edit/:id',component:CoverFormComponent,data:{covertype:'edit'}},
      {path:'banner',component:BannerComponent},
      {path:'banner/create',component:BannerFormComponent,data:{bannertype:'create'}},
      {path:'banner/edit/:id',component:BannerFormComponent,data:{bannertype:'edit'}},
      {path:'bannerdialog',component:BannerDialogComponent},
      {path:'bannerdialog/create',component:BannerDialogFormComponent,data:{bannertype:'create'}},
      {path:'bannerdialog/edit/:id',component:BannerDialogFormComponent,data:{bannertype:'edit'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
