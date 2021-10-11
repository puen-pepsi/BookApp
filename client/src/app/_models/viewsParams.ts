import { User } from "./user";

export class ViewsParams{
    pageNumber = 1;
    pageSize = 3;
    orderByViews = 'weekly';
    
    constructor(user?:User){
        this.orderByViews = 'weekly';
    }
}