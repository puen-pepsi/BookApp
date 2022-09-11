import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { ExternalAuthDto } from 'src/app/_models/externalAuthDto';
import { AccountService } from 'src/app/_services/account.service';
import { RankService } from 'src/app/_services/rank.service';
import { ThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() headlogo:string;
  @Input() isDarkMode:boolean;
  @Input() bgtool:string;
  @Output() sidenavtoggle = new EventEmitter<void>();
  @Output() toggleMode = new EventEmitter();
  model:any = {};
  public errorMessage: string = '';
  public showError: boolean;
  public theme:string;
  // allRank:Rank[] = [];
  ShowToggle = false;
  // bgtool:string = 'white';
  // getTheme: 'dark-mode' | 'light-mode';
  isSticky: boolean = false;
@HostListener('window:scroll', ['$event'])
checkScroll() {
  this.isSticky = window.pageYOffset >= 200;
}
  constructor(public accountService: AccountService ,
    private router : Router,
    private route :ActivatedRoute,
    private themeService: ThemeService, 
    private toastr:ToastrService,
    private rankService:RankService
    ) { 
        //this.headlogo ="./assets/images/logo.png"
        //this.headlogo ="./assets/images/logotransparent.png"
         
       
      }
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("change")
  // }

  ngOnInit(): void {
    
    // this.headlogo = this.route.snapshot.data.headlogo;
  //   this.rankService.getAllRank().subscribe( (res:Rank[]) => {
  //     this.allRank = res;
  //  });
  //  this.getTheme = localStorage.getItem('user-theme')==='dark-mode'?'light-mode': 'dark-mode';
  //  console.log(this.isDarkMode)
  //  this.themeService.update(this.getTheme);
  }
  onToggleSidenav(){
    this.sidenavtoggle.emit();
  }
  // mangaLogo(){
  //   if(!this.isDarkMode)this.headlogo ="./assets/images/logo_red.png";
  // }
  toggleDarkMode(event) {
    // this.isDarkMode = this.themeService.isDarkMode();

    // this.isDarkMode
    //   ? this.themeService.update('light-mode')
    //   : this.themeService.update('dark-mode');
    // if(this.isDarkMode){
    //   this.headlogo ="./assets/images/logo.png"
    //   this.bgtool = 'white';
    // }else{
    //   this.headlogo ="./assets/images/logotransparent.png"
    //   this.bgtool = 'black';
    // }
    
    this.toggleMode.emit(event);
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
  // CreateColor(point:number){
  //   for (let i = 0; i < this.allRank.length ; i++) {
  //     if(point < this.allRank[i].maxPoint){
  //       // this.bShadow = this.allRank[i].color;
  //       return  '0 0 0 2px '+ this.allRank[i].color;
  //     }
  //     if(i == this.allRank.length-1){
  //       // this.bShadow = this.allRank[this.allRank.length-1].color;
  //       return '0 0 0 2px '+ this.allRank[this.allRank.length-1].color;
  //     }
  //   }
  // }
  
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
