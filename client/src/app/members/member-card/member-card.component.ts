import { Component, Input, OnInit } from '@angular/core';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { Member } from 'src/app/_models/member';
import { MemberLike } from 'src/app/_models/memberlike';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member : Member;
  user:User;
  memberId :MemberLike;
  activitiesType = ActivitiesType.GiveTitle;
  constructor(private memberService:MembersService,
              private toastr:ToastrService,
              private accountService:AccountService,
              public presence:PresenceService) { 
                this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
                  this.user = user;
                })
              }

  ngOnInit(): void {
    if(this.user){
      this.memberService.getMemberLiked(this.member.id).subscribe(res =>{
        this.memberId = res;
      });
    }
    
  }
  followthis(event){
    if(event.active){
      this.addLike(event.membername);
    }else{
      this.unLike(event.membername);
    }
  }
  addLike(membername:string){
    this.memberService.addLike(membername).subscribe(() =>{
      this.toastr.success('You have liked '+ membername);
    })
  }
  unLike(membername:string){
    this.memberService.deletelikes(membername).subscribe(()=>{
      this.toastr.success('You have unliked '+ membername);
    })
  }
  
}
