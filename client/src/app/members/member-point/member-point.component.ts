import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Activities } from 'src/app/_models/activities';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ActivitiesService } from 'src/app/_services/activities.service';

@Component({
  selector: 'app-member-point',
  templateUrl: './member-point.component.html',
  styleUrls: ['./member-point.component.scss']
})
export class MemberPointComponent implements OnInit {
  activitiesType = ActivitiesType;
  activitieslist:Activities[];
  user:User;
  constructor(private activitiesService : ActivitiesService,
              private accountService:AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.activitiesService.getActivities().subscribe(res => {
      this.activitieslist = res;
      console.log(this.activitieslist)
    })
  }
  nextBatch(index) {
    console.log(index)
  }
}
