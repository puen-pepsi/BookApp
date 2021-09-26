import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";
import { Guid } from "guid-typescript";
import { Published } from "./published";

export class Chapter{
    id:number;
    chapterName:string;
    content:string;
    order:number;
    storyName:string;
    imageUrl:string;
    storyId:number;
    endChapter:boolean;
    authorName:string;
    authorImageUrl:string;
    publishedId:Guid;
    publishedCreated:Date;
    constructor(){
        this.id=0;
        this.chapterName="";
        this.content="";
        this.order=0;
        this.storyName="";
        this.imageUrl="";
        this.storyId=0;
        this.endChapter=false;
        this.authorName="";
        this.authorImageUrl="";

    }
}