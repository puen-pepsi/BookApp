import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list-carousel',
  templateUrl: './member-list-carousel.component.html',
  styleUrls: ['./member-list-carousel.component.scss']
})
export class MemberListCarouselComponent implements OnInit {
  members :Member[];
  pagination : Pagination;
  userParams:UserParams;
  user :User;
  genderList = [{value:'male',display:'males'},
                {value:'female',display:'females'},
                {value:'Other',display:'other'}]

  constructor(private memberService:MembersService) { 
    this.userParams = this.memberService.getUserParams();
    this.userParams.pageSize = 20;
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


}
