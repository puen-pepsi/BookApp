import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../_models/breadcrumb.model';
import { BreadcrumbService } from '../_services/breadcrumb.service';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent  {
  breadcrumbs$: Observable<Breadcrumb[]>; 
 
  constructor(private readonly breadcrumbService: BreadcrumbService) { 
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$; 
  } 

}
