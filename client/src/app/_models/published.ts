import { Guid } from "guid-typescript";

export class Published{
    id : Guid;
    created:Date;
    storychapterId:number;
    constructor(){
        this.id =null;
        this.created=null;
        this.storychapterId=null;
    }
}