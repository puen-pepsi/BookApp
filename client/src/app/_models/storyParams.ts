import { User } from "./user";

export class StoryParams{
    genre :string;
    author : string;
    storyType:string;
    language:string;
    search:string;
    pageNumber = 1;
    pageSize = 10;
    // topViews = 'views'
    // topRate = 'rating'
    orderBy = 'rating';
    constructor(user?:User){
        this.genre ='All';
        this.author='';
        this.storyType='novel';
        this.language='All';
        this.search='';
    }
}
