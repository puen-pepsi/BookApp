import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MaterialModule } from '../material.module';
import { GenreComponent } from './genre/genre.component';
import { GenreFormComponent } from './genre/genre-form/genre-form.component';
import { FormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component';
import { StatusFormComponent } from './status/status-form/status-form.component';
import { LanguageComponent } from './language/language.component';
import { LanguageFormComponent } from './language/language-form/language-form.component';
import { TagComponent } from './tag/tag.component';
import { TagFormComponent } from './tag/tag-form/tag-form.component';
import { ReporttopicComponent } from './reporttopic/reporttopic.component';
import { ReporttopicFormComponent } from './reporttopic/reporttopic-form/reporttopic-form.component';
import { ReportListComponent } from './report-list/report-list.component';
import { RankComponent } from './rank/rank.component';
import { RankFormComponent } from './rank/rank-form/rank-form.component';
import { ActivitiesPointComponent } from './activities-point/activities-point.component';
import { ActivitiesPointFormComponent } from './activities-point/activities-point-form/activities-point-form.component';
import { TitlenameComponent } from './titlename/titlename.component';
import { TitlenameFormComponent } from './titlename/titlename-form/titlename-form.component';
import { VipUserComponent } from './vip-user/vip-user.component';
import { SharedModule } from '../_modules/shared.module';
import { Slide2Component } from './slide2/slide2.component';
import { Slide2ListComponent } from './slide2/slide2-list/slide2-list.component';
import { Slide2CardComponent } from './slide2/slide2-card/slide2-card.component';
import { Slide2FormComponent } from './slide2/slide2-form/slide2-form.component';
import { Slide2FormImageComponent } from './slide2/slide2-form/slide2-form-image/slide2-form-image.component';
import { SlideComponent } from './slide/slide.component';
import { SlideCardComponent } from './slide/slide-card/slide-card.component';
import { SlideFormComponent } from './Slide/slide-form/slide-form.component';
import { SlideListComponent } from './Slide/slide-list/slide-list.component';
import { SlideFormImageComponent } from './slide/slide-form/slide-form-image/slide-form-image.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CoverComponent } from './cover/cover.component';
import { CoverFormComponent } from './cover/cover-form/cover-form.component';
import { CoverImageComponent } from './cover/cover-form/cover-image/cover-image.component';
import { CoverListComponent } from './cover/cover-list/cover-list.component';
import { CoverCardComponent } from './cover/cover-card/cover-card.component';
import { BannerComponent } from './banner/banner.component';
import { BannerFormComponent } from './banner/banner-form/banner-form.component';
import { BannerformImageComponent } from './banner/banner-form/bannerform-image/bannerform-image.component';
import { BannerCardComponent } from './banner/banner-card/banner-card.component';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { BannerDialogFormComponent } from './banner-dialog/banner-dialog-form/banner-dialog-form.component';
import { BannerDialogCardComponent } from './banner-dialog/banner-dialog-card/banner-dialog-card.component';
import { BannerDialogImageComponent } from './banner-dialog/banner-dialog-form/banner-dialog-image/banner-dialog-image.component';
import { ShowStoryModule } from '../show-story/show-story.module';


@NgModule({
  declarations: [    
    AdminPanelComponent,
    UserManagementComponent,
    GenreComponent,
    GenreFormComponent,
    StatusComponent,
    StatusFormComponent,
    LanguageComponent,
    LanguageFormComponent,
    TagComponent,
    TagFormComponent,
    ReporttopicComponent,
    ReporttopicFormComponent,
    ReportListComponent,
    RankComponent,
    RankFormComponent,
    ActivitiesPointComponent,
    ActivitiesPointFormComponent,
    TitlenameComponent,
    TitlenameFormComponent,
    VipUserComponent,
    SlideComponent,
    SlideCardComponent,
    SlideFormComponent,
    SlideListComponent,
    SlideFormImageComponent,
    Slide2Component,
    Slide2ListComponent,
    Slide2FormComponent,
    Slide2CardComponent,
    Slide2FormImageComponent,
    CoverComponent,
    CoverFormComponent,
    CoverImageComponent,
    CoverListComponent,
    CoverCardComponent,
    BannerComponent,
    BannerFormComponent,
    BannerformImageComponent,
    BannerCardComponent,
    BannerDialogComponent,
    BannerDialogFormComponent,
    BannerDialogCardComponent,
    BannerDialogImageComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ShowStoryModule

  ],
  exports:[
    CoverComponent,
  ]
})
export class AdminModule { }
