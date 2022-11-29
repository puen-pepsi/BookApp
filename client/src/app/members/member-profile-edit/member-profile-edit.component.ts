import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Rank } from 'src/app/_models/rank.model';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { RankService } from 'src/app/_services/rank.service';

@Component({
  selector: 'app-member-profile-edit',
  templateUrl: './member-profile-edit.component.html',
  styleUrls: ['./member-profile-edit.component.scss']
})
export class MemberProfileEditComponent implements OnInit {
 @ViewChild('editForm') editForm: NgForm;
  member :Member;
  user : User;
  allRank:Rank[]=[];
  rank :string;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private accountService:AccountService,
              private memberServcice:MembersService,
              private rankService:RankService,
              private toastr:ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
  }
  getUrl()
  {
    if(this.member.bannerUrl)return `url(${this.member.bannerUrl})`;
    //return "https://localhost:5001/Resources/images/slice1.png";
    return "linear-gradient(rgba(150, 197, 247, 1),rgba(2150, 197, 247, 0.5))";
  }
  CreateRank(point:number){
    for (let i = 0; i < this.allRank.length ; i++) {
      if(point < this.allRank[i].maxPoint){
        // this.bShadow = this.allRank[i].color;
        return  this.allRank[i].name;
      }
      if(i == this.allRank.length-1){
        // this.bShadow = this.allRank[this.allRank.length-1].color;
        return this.allRank[this.allRank.length-1].name;
      }
    }
  }
  loadMember(){
    this.memberServcice.getMember(this.user.username).subscribe(member => {
      this.member = member;
      // console.log(member)
      this.rankService.getAllRank().subscribe( (res:Rank[]) => {
        this.allRank = res;
        this.rank =this.CreateRank(this.member.point);
     });
    })
  }
  updateMember(){
    //console.log(this.member)
    this.memberServcice.updateMember(this.member).subscribe(() => {
       this.user.knownAs = this.member.knownAs;
       this.accountService.setCurrentUser(this.user);
       this.toastr.success('Profile update successfully');
       this.editForm.reset(this.member);
    })
  }

}
