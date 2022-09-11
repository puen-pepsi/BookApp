import { Component, OnInit, Output, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from './_services/theme.service';
import { StoryService } from './_services/story.service';
import { Tags } from './_models/tag';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  headlogo:string;
  footerlogo:string;
  bgtool:string;
  title = 'Rainobu';
  users: any;
  isDarkMode:boolean;
  datatype;
  tagArray;
  constructor(private accountService:AccountService,
              private themeService: ThemeService,
              private storyService:StoryService,
              private presence:PresenceService,
              private route :ActivatedRoute
              ){
                this.themeService.initTheme();
                this.isDarkMode = this.themeService.isDarkMode();
                if(!this.isDarkMode){
                  this.headlogo ="./assets/images/logo.png"
                  this.footerlogo ="./assets/images/logo.png"
                  this.bgtool = 'white';
                  }else{
                    this.headlogo ="./assets/images/logotransparent.png"
                    this.footerlogo ="./assets/images/logotransparent.png"
                    this.bgtool = 'black';
                  }
              }

  ngOnInit() {
     this.setCurrentUser();
     this.getAllTags();
  }
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();
    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
      if(this.isDarkMode){
      this.headlogo ="./assets/images/logo.png"
      this.footerlogo ="./assets/images/logo.png"
      this.bgtool = 'white';
      }else{
        this.headlogo ="./assets/images/logotransparent.png"
        this.footerlogo ="./assets/images/logotransparent.png"
        this.bgtool = 'black';
      }
  }
  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
    
  }
  getAllTags(){
    this.storyService.getAllTags()
         .subscribe( (res:Tags[]) => {
             this.tagArray = res.map(res => res.tagName);
         });
   }
  

}
