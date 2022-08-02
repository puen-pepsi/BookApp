import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../_modules/shared.module';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DateInputComponent } from '../_forms/date-input/date-input.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MaterialModule } from '../material.module';
import { ConfirmEmailComponent } from './confirm-email.component';
import { EmailsendComponent } from './emailsend/emailsend.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
    DateInputComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmEmailComponent,
    EmailsendComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild([
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path: 'forgotpassword',component:ForgotPasswordComponent },
      {path:'resetpassword',component:ResetPasswordComponent},
      {path: 'emailconfirmation', component: EmailConfirmationComponent },
      {path:'emailsend',component:EmailsendComponent}
    ])
  ],
  exports:[
    RegisterComponent
  ]
})
export class AuthenticationModule { }
