import { User } from "./user";

export class StoryParams{
    genre :string;
    author : string;
    pageNumber = 1;
    pageSize = 5;
    topViews = 'views'
    topRate = 'rating'
    orderBy = 'created';
    constructor(user:User){
        this.genre ='';
        this.author='';
    }
}