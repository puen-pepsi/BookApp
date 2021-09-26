export class LazyLoadParams{
    currentItem:number;
    takeSize:number;
    storyType:string;
    constructor(){
        this.currentItem = 0;
        this.takeSize = 10;
        this.storyType= '';
    }
}