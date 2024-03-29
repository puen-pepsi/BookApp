import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members :Member[];
  pagination : Pagination;
  userParams:UserParams;
  user :User;
  genderList = [{value:'male',display:'males'},
                {value:'female',display:'females'},
                {value:'Other',display:'other'}]

  constructor(private memberService:MembersService) { 
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }
  pageChanged(event:any){
    this.memberService.setUserParams(this.userParams);
    //this.userParams.pageNumber = event.page;
    this.userParams.pageNumber = event.pageIndex+1;
    this.loadMembers();
  }
}
