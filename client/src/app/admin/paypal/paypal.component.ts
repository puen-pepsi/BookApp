import { AfterContentInit, Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit,AfterContentInit{
  user:User;
  constructor(private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
    })
    render(
      {
          id: "#payments",
          currency: "USD",
          value: "5.00",
          onApprove: (details) => {
            alert("Transaction Successfull")
            console.log(this.user)
            //expire vip 
          }
        }
      );
   }
  ngAfterContentInit(): void {
    
  }

  ngOnInit(): void {
  }

}
