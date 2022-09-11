import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  FormData : FormGroup;
  constructor(private fb:FormBuilder,private contact:ContactService) { }

  ngOnInit(): void {
    this.FormData = this.fb.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      content: new FormControl('', [Validators.required])
    });
  }
  onSubmit(event) {
    this.contact.PostMessage(event).subscribe(()=> console.log("OK"))
   
  }
  getEmailErrorMessage(){
    var field = this.FormData.get('email');
    if (field.hasError('required')){
      return "The email field is required";
    }

    if (field.hasError('email')){
      return "The email is invalid";
    }

    return '';
  }
}
