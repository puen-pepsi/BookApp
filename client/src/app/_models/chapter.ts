import { Guid } from "guid-typescript";
import { Published } from "./published";

export class Chapter{
    id:number;
    chapterName:string;
    content:string;
    order:number;
    storyId:number;
    authorName:string;
    authorImageUrl:string;
    publishedId:Guid;
    publishedCreated:Date;
    constructor(){
        this.id=0;
        this.chapterName="";
        this.content="";
        this.order=0;
        this.storyId=0;
        this.authorName="";
        this.authorImageUrl="";

    }
}