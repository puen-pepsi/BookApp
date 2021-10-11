import { Component, OnInit } from '@angular/core';
import { VipUser } from 'src/app/_models/vipuser';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-vip-user',
  templateUrl: './vip-user.component.html',
  styleUrls: ['./vip-user.component.scss']
})
export class VipUserComponent implements OnInit {
  vipuser:VipUser[];
  searchText;

  constructor(private adminService:AdminService,) { }

  ngOnInit(): void {
    this.adminService.getAllVipUser().subscribe(res =>{
      this.vipuser = res;
    })
  }

}
