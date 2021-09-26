export class ActivitiesPoint{
     id: number;
     type: number;
     activitiesName: string;
     activeUserPoint: number;
     authorPoint: number;
     constructor(){
        this.id=0;
        this.type=0;
        this.activitiesName ="";
        this.activeUserPoint=0;
        this.authorPoint=0;
    }
}