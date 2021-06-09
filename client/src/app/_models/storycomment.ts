export interface StoryComment{
    id:number;
    storyId:number;
    parentId?:number;
    created:Date;
    content:string;
    username:string;
    knownAs:string;
    image:string;
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