import { Banner } from "./banner";
import { Photo } from "./photo";
import { TitleActives } from "./titleactives";

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    bannerUrl:string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    point:number;
    title:string;
    photos: Photo[];
    banners: Banner[];
    titleActives:TitleActives[];

}
