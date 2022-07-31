import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { PresenceService } from './presence.service';
import { FacebookLoginProvider, SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { ExternalAuthDto } from '../_models/externalAuthDto';
import { CustomEncoder } from './custom-encoder';
import { ForgotPasswordDto } from '../_models/forgotpasswordDto';
import { ResetPasswordDto } from '../_models/ResetPasswordDto';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  helper = new JwtHelperService();
  clearTimeout: any;
  constructor(private http: HttpClient,
            private _externalAuthService: SocialAuthService,
            private presence:PresenceService,
            private router : Router) { }

  login(model:any){
    return this.http.post(this.baseUrl + 'account/login',model).pipe(
      map((response:User)=>{
        const user = response;
        // console.log(user)
        if(user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
          // console.log(user);
        }
      })
    )
  }

  register(model:any){
    // return this.http.post(this.baseUrl + 'account/register',model).pipe(
    //   map((user:User) => {
    //     if(user){
    //       this.setCurrentUser(user);
    //       this.presence.createHubConnection(user);
    //     }
    //   })
    // )
    return this.http.post(this.baseUrl + 'account/register',model);
  }
  isAuthenticated(){
    const user = JSON.parse(localStorage.getItem("user"));
    return !this.helper.isTokenExpired(user.token);
  }
  setCurrentUser(user:User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    // console.log(this.getDecodedToken(user.token).exp);
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
      localStorage.setItem('user',JSON.stringify(user));
      this.currentUserSource.next(user);
      
      // let date = new Date();
      // let expirationDate = this.helper.getTokenExpirationDate(user.token);
      // var secondBetweenTwoDate = Math.abs((new Date().getTime() - expirationDate.getTime()) / 1000);
      // this.autoLogout(secondBetweenTwoDate);
  }
  // autoLogout(expirationDate: number) {
  //   //console.log(expirationDate);
  //   this.clearTimeout = setTimeout(() => {
  //     this.logout();
  //   }, expirationDate *1000);
  // }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
    this.router.navigateByUrl('/');
    // if (this.clearTimeout) {
    //   clearTimeout(this.clearTimeout);
    // }
  }
  public forgotPassword = (route: string, body: ForgotPasswordDto) => {
    return this.http.post(this.createCompleteRoute(route, this.baseUrl), body);
  }
  public resetPassword = (route: string, body: ResetPasswordDto) => {
    return this.http.post(this.createCompleteRoute(route, this.baseUrl), body);
  }
  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    return this.http.get(this.createCompleteRoute(route, this.baseUrl), { params: params });
  }
  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }
  public signInWithGoogle = ()=> {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signInWithFaceBook = ()=>{
    return this._externalAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }

  externalLogin(externalAuth: ExternalAuthDto){
    return this.http.post(this.baseUrl+'account/externallogin',externalAuth).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }
  Savesresponse(responce)
  {
    return this.http.post(this.baseUrl+'account/saveresponse',responce);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }
}
