import { ShowStory } from "../_models/showstory";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ShowStoryService } from "../show-story/show-story.service";

@Injectable({
    providedIn:'root'
})

export class ShowDetailedResolver implements Resolve<ShowStory> {
    
    constructor(private showStoryService:ShowStoryService){}
    resolve(route: ActivatedRouteSnapshot): Observable<ShowStory> {
        return this.showStoryService.getStoryName(route.paramMap.get('storyname'));
    }

}
