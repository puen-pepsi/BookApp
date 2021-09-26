import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { ExternalAuthDto } from '../../_models/externalAuthDto';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  model:any={};
  public errorMessage: string = '';
  public showError: boolean;
  registerMode = false;
  constructor(public accountService: AccountService ,
    private router : Router,
    private route :ActivatedRoute,
    private toastr:ToastrService,) { }


  ngOnInit(): void {
    this.registerMode=false;
  }
  login(){
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/stories');
      this.toastr.success("LogIn success","Infomation");
    },(error) => {
      this.errorMessage = error;
      this.showError = true;
    })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
    this.toastr.success("LogOut success","Information")
  } 

  public loginWithGoogle = () => {
    //this.showError = false;
    this.accountService.signInWithGoogle()
    .then(res => {
      const user: SocialUser = { ...res };
      console.log(user)
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken
      }
      this.validateExternalAuth(externalAuth);
    }, error => console.log(error))
  }
  gotoRegister(){
    this.router.navigate([])
  }
  // public loginWithFacebook = () => {
  //   //this.showError = false;
  //   this.accountService.signInWithFaceBook()
  //   .then(res => {
  //     const user: SocialUser = { ...res };
  //           console.log(user)

  //     // this.validateExternalAuth(externalAuth);
  //   }, error => console.log(error))
  // }
  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.accountService.externalLogin(externalAuth)
      .subscribe(res => {
        // localStorage.setItem("token", res.token);
        // this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        // this.router.navigate([this._returnUrl]);
        this.router.navigateByUrl('/stories');
        this.toastr.success("LogIn Success","Information");
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      });
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
  home(){
    this.router.navigateByUrl('/')
  }
}
