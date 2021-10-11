import { AfterContentInit, Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AdminService } from 'src/app/_services/admin.service';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit,AfterContentInit{
  user:User;
  expireddate:Date;
  days;
  constructor(private accountService:AccountService,
              private toastr:ToastrService,
              private adminService:AdminService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
    })
    
   }
  ngAfterContentInit(): void {
    render(
      {
          id: "#payments",
          currency: "USD",
          value: "5.00",
          onApprove: (details) => {
            //alert("Transaction Successfull")
            this.toastr.success("Transaction Successfull","VIP Membership")
            //console.log(this.user)
            //expire vip 
            this.adminService.getVipForUser(this.user.username).subscribe(res =>{
                console.log(res)
            })
          }
        }
      );
  }

  ngOnInit(): void {
    //get expired date vip
    this.adminService.getExpiredUser(this.user.username).subscribe(res => {
        if(res){
          this.expireddate = res;
          this.days = this.getDaysRemain(res)
          console.log(this.days)
        }
        
    })
  }
  getDaysRemain(expiredate:Date){
    var expired = new Date(expiredate);
    var currentdate = new Date();
    console.log(expired)
    console.log(currentdate)
    var diff = expired.getTime() - currentdate.getTime();
    return (diff > 0? Math.ceil(diff / (1000 * 3600 * 24)):0); 
  }
}
