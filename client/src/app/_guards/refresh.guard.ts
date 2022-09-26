import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {
  constructor(private accountService:AccountService,
                private router:Router,
                private toastr:ToastrService){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if(this.accountService.isAuthenticated()==null)return true;
    if(this.accountService.isAuthenticated()){
      this.accountService.refreshToken();
    }else{
      this.router.navigate(['authentication/login'], { queryParams: { returnUrl: state.url }});
          this.toastr.error('Please Login to see content.');
          return false;
    }
    return true;
  }
  
}
