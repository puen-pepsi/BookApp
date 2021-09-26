import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(private accountService:AccountService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;

    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];

    console.log(token);
    console.log(email);

    this.accountService.confirmEmail('account/emailconfirmation', token, email)
    .subscribe(_ => {
      this.showSuccess = true;
      console.log("true")
    },
    error => {
      this.showError = true;
      this.errorMessage = error;
      console.log("false")
    })
  }

}