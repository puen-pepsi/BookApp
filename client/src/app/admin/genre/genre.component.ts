import { Component, OnInit } from '@angular/core';
import { Genres } from '../../_models/genre';
import { GenreService } from '../../_services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  constructor(public genreService:GenreService) { }

  ngOnInit(): void {
    this.genreService.refreshList();
  }
  populateForm(selectedRecord: Genres) {
    this.genreService.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     console.log(id);
     this.genreService.deleteGenre(id)
     .subscribe(
       res=>{
          this.genreService.refreshList();
       },
       err=>{console.log(err)}
     )
   }
}
