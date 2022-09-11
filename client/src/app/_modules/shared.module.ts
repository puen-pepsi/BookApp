import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ScrollSpyModule } from 'ng-spy';
import { HasRoleDirective } from '../_directives/has-role.directive';
import {IvyCarouselModule} from 'angular-responsive-carousel2'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GetRoleDirective } from '../_directives/get-role.directive';
import { SanitizeHtmlPipe } from 'src/pipe/sanitize-html.pipe';
import { TruncatePipe } from 'src/pipe/truncate.pipe';
import { InfiniteScrollModule} from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HasRoleDirective,
    GetRoleDirective,
    SanitizeHtmlPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
        positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    ModalModule.forRoot(),
    ScrollSpyModule,
    IvyCarouselModule,
    Ng2SearchPipeModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    ModalModule,
    ScrollSpyModule,
    HasRoleDirective,
    GetRoleDirective,
    IvyCarouselModule,
    Ng2SearchPipeModule,
    SanitizeHtmlPipe,
    TruncatePipe,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
