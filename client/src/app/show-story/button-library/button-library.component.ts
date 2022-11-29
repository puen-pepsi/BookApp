import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { ShowStory } from 'src/app/_models/showstory';
import { AccountService } from 'src/app/_services/account.service';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-button-library',
  templateUrl: './button-library.component.html',
  styleUrls: ['./button-library.component.scss']
})
export class ButtonLibraryComponent{
  @Input() story:ShowStory;
  @Input() outline:boolean;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting=false;
  activitiesType = ActivitiesType.followStory;
  activitiesTimer = true;
  constructor(private accountService:AccountService,
              private showStoryService:ShowStoryService,
              private activitiesService:ActivitiesService,
              private toastr:ToastrService,
              private router:Router) { }

  toggleFollowing() {
    this.isSubmitting = true;
      if( !this.accountService.isAuthenticated()){
         this.router.navigateByUrl('authentication/login');
         return of(null)
      }

        // Follow this profile if we aren't already
        if (!this.story.liked) {
          return this.showStoryService.addLikeStory(this.story).subscribe(() =>{
            this.isSubmitting = false;
            if(this.activitiesTimer){
               this.activitiesService.postActivities(this.activitiesType,this.story.  storyName).subscribe(res =>{
                  console.log(res);
              })
            }
            this.toggle.emit(true);
            this.toastr.success('You have add to library '+ this.story.storyName);
          })
        }else{
          return this.showStoryService.deleteStoryLike(this.story).subscribe(() =>{
            this.isSubmitting = false;
            this.activitiesTimer = false;
                setTimeout(() => {
                  this.activitiesTimer = true;
                }, 300000);
            this.toggle.emit(false);
            this.toastr.warning('You have delete from library '+ this.story.storyName);
          })
        }
      }
}
