import { Photo } from "./photo";

export interface ShowStory {
    storyId:number;
    storyName : string;
    description :string;       
    genre :string;
    language:string;
    imageUrl:string;
    rating:number;
    totalRate:number;
    totalChapter:number;
    views:number;
    created:Date;
    state:string;
    userName:string;
    userPhoto:string;
    tags:string;
    //photos: Photo[];
    
}