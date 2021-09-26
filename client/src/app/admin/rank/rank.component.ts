import { Component, OnInit } from '@angular/core';
import { Rank } from 'src/app/_models/rank.model';
import { RankService } from 'src/app/_services/rank.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {

  constructor(public rankService :RankService) { }

  ngOnInit(): void {
    // this.rankService.refreshList();
    this.rankService.refreshList();
  }
  populateForm(selectedRecord: Rank) {
    this.rankService.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number)
   {
     console.log(id);
     this.rankService.deleteRank(id)
     .subscribe(
       res=>{
          this.rankService.refreshList();
       },
       err=>{console.log(err)}
     )
   }

}
