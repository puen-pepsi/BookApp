import { Component, Input, OnInit } from '@angular/core';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { ToastrService } from 'ngx-toastr';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { Member } from 'src/app/_models/member';
import { MemberLike } from 'src/app/_models/memberlike';
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
  memberId :MemberLike;
  activitiesType = ActivitiesType.GiveTitle;
  constructor(private memberService:MembersService,
              private toastr:ToastrService,
              private activitiesService:ActivitiesService,
              public presence:PresenceService) { }

  ngOnInit(): void {
    this.memberService.getMemberLiked(this.member.id).subscribe(res =>{
      this.memberId = res;
    });
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
  giveTitle(event){
    console.log(event)
    this.activitiesService.postTitle(this.activitiesType,this.member.id,event ).subscribe(res =>{
      this.toastr.success(`Give Title to Member ${this.member.knownAs}`,"Give Title")
  }) 
  }
}
