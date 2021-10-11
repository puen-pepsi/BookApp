import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private accountService:AccountService,
      private router:Router,
      private toastr:ToastrService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // return this.accountService.currentUser$.pipe(
    //   map(user => {
    //     if(user){
    //         return true;
    //     } else{
    //       // not logged in so redirect to login page with the return url
    //       this.accountService.logout();
    //       this.router.navigate(['authentication/login'], { queryParams: { returnUrl: state.url }});
    //       this.toastr.error('You shall not pass')
    //       return false;
    //     } 
    //   })
    // )
    return this.accountService.currentUser$.pipe(
      map( user => {
        const expirationDate = this.helper.isTokenExpired(user.token);
        if(expirationDate){
            this.accountService.logout();
            this.router.navigate(['/authentication/login'],{queryParams: { returnUrl: state.url }});
            return false;
        }
        // if(!this.helper.isTokenExpired(user.token)){
        //    console.log(user.token)
        //    return true
        // }
        // this.accountService.logout();
        // this.router.navigate(['/authentication/login']);
        // return false;
        return true;
      })
    )
  }
  
}
// if (state.url !== '/login' && !this.authService.isAuthenticated()) {
//   this.router.navigate(['/login']);
//   return false;
// }

// return true;