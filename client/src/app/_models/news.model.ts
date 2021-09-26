export class News{
    id:number;
    topic:string;
    content:string;
    pictureUrl:string;
    userName:string;
    userPhoto:string;
    newsCreated:Date;
    constructor(){
        this.id=0;
        this.topic="";
        this.content ="";
        this.pictureUrl="";
        this.userName="";
        this.userPhoto="";
        this.newsCreated;
    }
}