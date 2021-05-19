import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';
import { ShowStory } from 'src/app/_models/showstory';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ShowstoryService } from 'src/app/_services/showstory.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
  @ViewChild('storyTabs',{static:true}) storyTabs:TabsetComponent;
  showstory : ShowStory;
  user : User;
  activeTab:TabDirective;

  constructor(private showStoryService:ShowstoryService,
    private route:ActivatedRoute,
    private accountService:AccountService,
    private router:Router) { 
          this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user =user);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.showstory = data.showstory;

    })
  }
  onTabActivated(data: TabDirective){
    this.activeTab = data;
    
  }
}
