export class Story{
        storyId:number;
        storyName : string;
        description :string;       
        genre :string;
        language:string;
        imageUrl:string;
        state:string;
        rating:number;
        views:number;
        created:Date;
        username:string;
        userphoto:string;
        tags:string;
        constructor(){
                this.storyId=0;
                this.storyName="";
                this.description ="";
                this.genre="";
                this.language="";
                this.imageUrl="";
                this.userphoto="";
                this.views=0;
                this.state="";
                this.rating=0;      
        }
}