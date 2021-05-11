export class Story{
        id:number;
        storyName : string;
        description :string;       
        genre :string;
        language:string;
        imageUrl:string;
        rating:number;
        views:number;
        created:Date;
        username:string;
        constructor(){
                this.id=0;
                this.storyName="";
                this.description ="";
                this.genre="";
                this.language="";
                this.imageUrl="";
                this.views=0;
                this.rating=0;      
        }
}