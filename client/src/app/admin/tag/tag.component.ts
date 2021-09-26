import { Component, OnInit } from '@angular/core';
import { Tags } from 'src/app/_models/tag';
import { TagsService } from 'src/app/_services/tags.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(public tagsService :TagsService) { }

  ngOnInit(): void {
    this.tagsService.refreshList();
  }
  populateForm(selectedRecord: Tags) {
    this.tagsService.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     console.log(id);
     this.tagsService.deleteTags(id)
     .subscribe(
       res=>{
          this.tagsService.refreshList();
       },
       err=>{console.log(err)}
     )
   }
}
