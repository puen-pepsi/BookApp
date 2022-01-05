import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { RolesModalComponent } from 'src/app/Modals/roles-modal/roles-modal.component';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { User } from 'src/app/_models/user';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;
  bsModalRef:BsModalRef;
  searchText;
  activitiesType = ActivitiesType.GiveTitle;

  constructor(private adminService:AdminService,
              private toastr:ToastrService,
              private activitiesService:ActivitiesService,
              private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe(users => {
      this.users = users;
    })
  }
  openRolesModal(user:User){
    const config = {
      class: 'modal=dialog-centered',
      initialState: {
        user,
        roles : this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if(rolesToUpdate){
        this.adminService.updateUserRoles(user.username,rolesToUpdate.roles).subscribe(() => {
          user.roles  = [...rolesToUpdate.roles]
        })
      }
    });
    
  }
  private getRolesArray(user){
    const roles = [];
    const userRoles = user.roles;
    const availableRoles:any[]=[
      {name :'Admin',value:'Admin'},
      {name :'Moderator',value:'Moderator'},
      {name :'Member',value:'Member'},
      //add vip
      {name :'VIP',value:'VIP'}
    ];

    availableRoles.forEach(role => {
      let isMath = false;
      for (const userRole of userRoles){
        if(role.name === userRole){
          isMath = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if(!isMath){
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }
  giveTitle(event){
    this.activitiesService.postTitle(this.activitiesType,event.userid,event.data ).subscribe(res =>{
      this.toastr.success(`Give Title to Member ${event.username}`,"Give Title")
    }) 
  }

}
