import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService,
              private router:Router,
              private toastr:ToastrService){}
  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // return this.accountService.currentUser$.pipe(
    //   map(user => {
    //     if(user){
    //         return true;
    //     } 
    //       // not logged in so redirect to login page with the return url
    //       this.accountService.logout();
    //       this.router.navigate(['authentication/login'], { queryParams: { returnUrl: state.url }});
    //       this.toastr.error('Please Login to see content.')
    //       return false;
    //   })
    // )
 
    if(this.accountService.isAuthenticated()){
        this.accountService.refreshToken();
        return true;
    } else{
          this.router.navigate(['authentication/login'], { queryParams: { returnUrl: state.url }});
          this.toastr.error('Please Login to see content.');
          return false;
    }
  }
}
