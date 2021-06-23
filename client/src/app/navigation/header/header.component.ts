import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavtoggle = new EventEmitter<void>();
  model:any = {}
  constructor(public accountService: AccountService ,private router : Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onToggleSidenav(){
    this.sidenavtoggle.emit();
  }
  login(){
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
      this.toastr.success("LogIn success","Infomation");
    },error => {
      console.log(error);
    })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
    this.toastr.success("LogOut success","Information")
  } 
}
