import { ChapterList } from "./chapterlist";
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
    getState:string;
    userName:string;
    userPhoto:string;
    title:string;
    point:number;
    tags:string;
    lastChapterName: string;
    lastChapterCreate: Date;
    //photos: Photo[];
    
}