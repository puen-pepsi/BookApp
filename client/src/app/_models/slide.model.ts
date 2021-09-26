export class Slide{
    id:number;
    title:string;
    url:string;
    descriptions:string;
    gotoUrl:string;
    constructor(){
        this.id=0;
        this.title="";
        this.url="";
        this.descriptions ="";   
        this.gotoUrl="";
    }
}