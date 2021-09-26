import { Component, Input, OnInit } from '@angular/core';
import { title } from 'process';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { TitleActives } from 'src/app/_models/titleactives';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-title-editor',
  templateUrl: './title-editor.component.html',
  styleUrls: ['./title-editor.component.scss']
})
export class TitleEditorComponent implements OnInit {
  @Input() member: Member;
  user:User;
  constructor(private accountService:AccountService,private memberService:MembersService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }
  setMainTitle(titleactive:TitleActives){
    this.memberService.setMainTitle(titleactive.id).subscribe(() =>{
      this.user.title = titleactive.name
      this.accountService.setCurrentUser(this.user);
      this.member.title = titleactive.name;
      this.member.titleActives.forEach(p=>{
        if(p.isMain) p.isMain = false;
        if(p.id==titleactive.id)p.isMain = true;
      })
    })
  }

  deleteTitle(titleId:number){
    this.memberService.deleteTitle(titleId).subscribe(()=>{
        this.member.titleActives = this.member.titleActives.filter(x => x.id !== titleId);
    })
  }
}
