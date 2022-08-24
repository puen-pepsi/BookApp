import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { timeStamp } from 'console';
import { ForgotPasswordDto } from 'src/app/_models/forgotpasswordDto';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: UntypedFormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;
  urladdress = environment.urlAddress;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue) => {
    this.showError = this.showSuccess = false;

    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI:`${this.urladdress}authentication/resetpassword`
      // clientURI: 'https://localhost:4200/authentication/resetpassword'
      //clientURI: 'https://rainobunew.azurewebsites.net/authentication/resetpassword'
    }

    this.accountService.forgotPassword('account/forgotpassword', forgotPassDto)
    .subscribe(_ => {
      this.showSuccess = true;
      this.successMessage = 'The link has been sent, please check your email to reset your password.';
      this.resetForm();
    },
    err => {
      this.showError = true;
      this.errorMessage = err;
    })
  }
  resetForm(){
    this.forgotPasswordForm = new UntypedFormGroup({
      email: new UntypedFormControl("", [Validators.required])
    })
  }
}
