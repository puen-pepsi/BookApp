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
  selector: 'app-followstory',
  templateUrl: './followstory.component.html',
  styleUrls: ['./followstory.component.scss']
})
export class FollowstoryComponent{
  // @Input() isActive:boolean;
  // @Input() storyid:number;
  // @Input() storyname:string;
  @Input() story:ShowStory;
  @Output() toggle = new EventEmitter<ShowStory>()
  isSubmitting = false;
  activitiesTimer = true;
  activitiesType = ActivitiesType.followStory;
  constructor(private accountService:AccountService,
              private router:Router,
              private activitiesService:ActivitiesService,
              private toastr:ToastrService,
              private showStoryService:ShowStoryService) { }
  // onClick(){
  //   this.story.liked = !this.story.liked;
  //   // this.follow.emit({storyid:this.storyid,storyname:this.storyname,active:this.isActive});
  //   this.follow.emit(this.story);
  // }
  toggleFollowing() {
    this.isSubmitting = true;
      if( !this.accountService.isAuthenticated()){
         this.router.navigateByUrl('authentication/login');
         return of(null)
      }

        // Follow this profile if we aren't already
        if (!this.story.liked) {
          return this.showStoryService.addLikeStory(this.story).subscribe( response =>{
            this.isSubmitting = false;
            if(this.activitiesTimer){
               this.activitiesService.postActivities(this.activitiesType,this.story.  storyName).subscribe(res =>{
                  console.log(res);
              })
            }
            this.toggle.emit(response);
            this.toastr.success('You have add to library '+ this.story.storyName);
          })
        }else{
          return this.showStoryService.deleteStoryLike(this.story).subscribe(res =>{
            // console.log(res)
            this.isSubmitting = false;
            this.activitiesTimer = false;
                setTimeout(() => {
                  this.activitiesTimer = true;
                }, 300000);
            this.toggle.emit(res);
            this.toastr.warning('You have delete from library '+ this.story.storyName);
          })
        }
      }
}
