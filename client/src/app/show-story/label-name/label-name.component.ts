import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rank } from 'src/app/_models/rank.model';
import { AdminService } from 'src/app/_services/admin.service';
import { RankService } from 'src/app/_services/rank.service';

@Component({
  selector: 'app-label-name',
  templateUrl: './label-name.component.html',
  styleUrls: ['./label-name.component.scss']
})
export class LabelNameComponent implements OnInit,AfterViewInit{
  @Input('imageUrl') imageUrl:string;
  @Input('knownAs') knownAs:string;
  @Input('userName') userName:string;
  @Input('pHeight') pHeight:number;
  @Input('point') point:number;
  @Input('title') title:string;
  @Output() username = new EventEmitter();
  allRank : Rank[] = [];
  bShadow :string="#ffffff";
  //setHeight :string= '40px';
  rank:string;
  border:number;
  tooltip:string;
  role:string[]=[];
  isVIP:boolean;
  constructor(private rankService : RankService,
              private adminSevice : AdminService) {

   }
  ngAfterViewInit(): void {
    // console.log(this.imageUrl);
    // console.log(this.point);
    // this.isVIP = this.createCrown(this.role);
  }
  ngOnInit(): void {
    //  this.setHeight = this.pHeight;
    this.isVIP = false;
     this.adminSevice.getUserRoles(this.userName).subscribe(res =>{
       //check google login
       if(res.roles != null){
          this.role = res.roles;
          this.isVIP = this.role.includes("VIP");
       }
     })
     this.rankService.getAllRank().subscribe( (res:Rank[]) => {
        this.allRank = res;
        this.rank = this.CreateColor(this.point);
        this.tooltip =this.CreateRank(this.point);
     });
     this.border = this.pHeight * 0.07;
  }
  CreateRank(point:number){
    for (let i = 0; i < this.allRank.length ; i++) {
      if(point < this.allRank[i].maxPoint){
        // this.bShadow = this.allRank[i].color;
        return  this.allRank[i].name;
      }
      if(i == this.allRank.length-1){
        // this.bShadow = this.allRank[this.allRank.length-1].color;
        return this.allRank[this.allRank.length-1].name;
      }
    }
  }
  CreateColor(point:number){
    for (let i = 0; i < this.allRank.length ; i++) {
      if(point < this.allRank[i].maxPoint){
        // this.bShadow = this.allRank[i].color;
        // return  '0 0 0 2px '+ this.allRank[i].color;
        return  `0 0 0 ${this.border}px `+ this.allRank[i].color;
      }
      if(i == this.allRank.length-1){
        // this.bShadow = this.allRank[this.allRank.length-1].color;
        //return '0 0 0 2px '+ this.allRank[this.allRank.length-1].color;
        return `0 0 0 ${this.border}px `+ this.allRank[this.allRank.length-1].color;
      }
    }
  }
  gotoMember(){

    this.username.emit(this.userName.toLowerCase());
  }
  createCrown(vip:string[]):boolean{
     return (this.role.includes('VIP'))?true:false;
  }
  // getColor(title:string) {
  //   switch (title.substring(0,3)) {
  //     case "UK":
  //       return "green";
  //     case "USA":
  //       return "blue";
  //     case "HK":
  //       return "red";
  //   }
  // }
}
