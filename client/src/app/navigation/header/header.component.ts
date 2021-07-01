import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { ExternalAuthDto } from 'src/app/_models/externalAuthDto';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() headlogo:string;
  @Output() sidenavtoggle = new EventEmitter<void>();
  model:any = {};
  public errorMessage: string = '';
  public showError: boolean;
  constructor(public accountService: AccountService ,
    private router : Router,
    private route :ActivatedRoute,
    private toastr:ToastrService,
    ) { 
          this.headlogo ="./assets/images/logo.png"
       
      }

  ngOnInit(): void {
    // this.headlogo = this.route.snapshot.data.headlogo;
  }
  onToggleSidenav(){
    this.sidenavtoggle.emit();
  }
  login(){
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/stories');
      this.toastr.success("SignIn success","Infomation");
    },error => {
      console.log(error);
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
      //console.log(user)
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken
      }
      this.validateExternalAuth(externalAuth);
    }, error => console.log(error))
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
        this.toastr.success("SignIn Success","Information");
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      });
  }
  // Savesresponse(socialusers: SocialUser) {    
    
  //   this.accountService.Savesresponse(socialusers).subscribe((res: any) => {    
  //     debugger;    
  //     console.log(res);    
  //     this.socialusers=res;    
  //     this.response = res.userDetail;    
  //     localStorage.setItem('socialusers', JSON.stringify( this.socialusers));    
  //     console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));    
  //     this.router.navigate([`/Dashboard`]);    
  //   })    
  // }  
  logoClick(event){
    this.router.navigate(["/"]);
  }  
}
