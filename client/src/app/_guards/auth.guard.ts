import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService,
      private router:Router,
      private toastr:ToastrService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.accountService.currentUser$.pipe(
      map(user => {
        if(user){
            return true;
        } else{
          // not logged in so redirect to login page with the return url
          this.router.navigate(['authentication/login'], { queryParams: { returnUrl: state.url }});
          //this.toastr.error('You shall not pass')
          return false;
        }
        
      })     
    )
  }
  
}
// if (state.url !== '/login' && !this.authService.isAuthenticated()) {
//   this.router.navigate(['/login']);
//   return false;
// }

// return true;