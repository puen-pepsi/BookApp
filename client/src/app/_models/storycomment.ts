
export interface StoryComment{
    id:number;
    storyId:number;
    parentId?:number;
    chapterId?:number;
    created:Date;
    content:string;
    userName:string;
    knownAs:string;
    point:number;
    title:string;
    image:string;
    liked:string[];
    /**
     *
     */
    // constructor() {
    //     this.id=0;
    //     this.storyId=0;
    //     this.content="";
    //     this.knownAs="";
    //     this.image="";
    // }
}