import { ShowStory } from "../_models/showstory";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ShowstoryService } from "../_services/showstory.service";

@Injectable({
    providedIn:'root'
})

export class ShowDetailedResolver implements Resolve<ShowStory> {
    
    constructor(private showStoryService:ShowstoryService){}
    resolve(route: ActivatedRouteSnapshot): Observable<ShowStory> {
        return this.showStoryService.getStoryName(route.paramMap.get('storyname'));
    }

}
