import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit {
  breadcrumb$ : Observable<any[]>;
  
  constructor(private bcService:BreadcrumbService) { }


  ngOnInit(): void {
    this.breadcrumb$ = this.bcService.breadcrumbs$;
  }


}
