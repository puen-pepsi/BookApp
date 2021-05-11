import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/_models/language.model';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(public languageService:LanguageService) { }

  ngOnInit(): void {
    this.languageService.refreshList();
  }
  populateForm(selectedRecord: Language) {
    this.languageService.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     console.log(id);
     this.languageService.deleteLanguage(id)
     .subscribe(
       res=>{
          this.languageService.refreshList();
       },
       err=>{console.log(err)}
     )
   }

}
