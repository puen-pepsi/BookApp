import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShowStoryService } from 'src/app/show-story/show-story.service';
import { RankService } from 'src/app/_services/rank.service';
import { Rank } from 'src/app/_models/rank.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UntypedFormControl } from '@angular/forms';
import { MemberLike } from 'src/app/_models/memberlike';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  // @ViewChild('memberTabs',{static:true}) memberTabs: TabsetComponent;
  member :Member;
  memberId :MemberLike;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  // activeTab:TabDirective;
  messages:Message[] = [];
  user : User;
  author:string;
  allRank : Rank[] = [];
  rank:string;
  selected = new UntypedFormControl(0);
  // backgroundUrl="https://localhost:5001/Resources/images/f583a490-da7e-45ca-acdd-0d486e6e31a6.jpeg";
  constructor(public presence:PresenceService,
      private memberService:MembersService,
      private showStoryService:ShowStoryService,
      private route:ActivatedRoute,
      private messageService:MessageService,
      private accountService:AccountService,
      private bcService:BreadcrumbService,
      private toastr:ToastrService,
      private rankService:RankService,
      private router:Router) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
      console.log(this.member);
      this.author = this.member.username;
      this.rankService.getAllRank().subscribe( (res:Rank[]) => {
        this.allRank = res;
        this.rank =this.CreateRank(this.member.point);
     });
    })

    this.route.queryParams.subscribe(params => {
      // params.tab ? this.selectTab(params.tab) : this.selectTab(0);
      params.tab ? this.selected.setValue(params.tab): this.selected.setValue(0) ;
      if(params.tab == 2){
         this.messageService.createHubConnection(this.user,this.member.username);
      }
    })

    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      }
    ]
    this.galleryImages = this.getImages();
    this.getUrl();
    //Get following 
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
      this.toastr.success('You have Following '+ membername);
    })
  }
  unLike(membername:string){
    this.memberService.deletelikes(membername).subscribe(()=>{
      this.toastr.success('You have unFollow '+ membername);
    })
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
  getImages():NgxGalleryImage[]{
    const imageUrls =[];
    for (const photo of this.member.photos){
      imageUrls.push({
        small:photo?.url,
        medium:photo?.url,
        big:photo?.url
      })
    }
    return imageUrls
  }
  getUrl()
  {
    if(this.member.bannerUrl)return `url(${this.member.bannerUrl})`;
    return "linear-gradient(rgba(150, 197, 247, 1),rgba(2150, 197, 247, 0.5))";
  }

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }
  // selectTab(tabId: number){
  //   this.memberTabs.tabs[tabId].active = true;
  // }
  // onTabActivated(data: TabDirective){
  //   this.activeTab = data;
  //   if(this.activeTab.heading === 'Messages' && this.messages.length === 0){
  //     this.messageService.createHubConnection(this.user,this.member.username);
  //   }else{
  //     this.messageService.stopHubConnection();
  //   }
  // }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(tabChangeEvent.tab.textLabel==="Messages" && this.messages.length === 0){
      this.messageService.createHubConnection(this.user,this.member.username);
    }else{
      this.messageService.stopHubConnection();
    }

  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

}
