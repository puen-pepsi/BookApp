import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Language } from 'src/app/_models/language.model';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent implements OnInit {

  constructor(public languageService:LanguageService,
    private fb:FormBuilder) { }

ngOnInit(): void {
}

onSubmit(form:NgForm) {
  if(this.languageService.formData.id == 0) //we will use the id as identifier for updating or insertion
  this.insertRecord(form);
  else
  this.updateRecord(form);
}
insertRecord(form:NgForm) {
  this.languageService.postLanguage().subscribe(
    res => {
      this.resetForm(form);
      this.languageService.refreshList();
    },
    err => {
      console.log(err);
    }
  );
}
updateRecord(form: NgForm) {
  this.languageService.putLanguage().subscribe(
    res => {
      this.resetForm(form);
      this.languageService.refreshList();
    },
    err => {
      console.log(err);
    }
  );
}
resetForm(form: NgForm) {
    form.form.reset();
    this.languageService.formData = new Language();
}

}
