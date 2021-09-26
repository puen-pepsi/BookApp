import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { Chapter } from 'src/app/_models/chapter';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { StoryService } from 'src/app/_services/story.service';
import { StorychapterService } from 'src/app/_services/storychapter.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit {
  @Output() goForm = new EventEmitter;
  activitiesType = ActivitiesType.writeChapter;
  chapter:Chapter[]=[];
  published:Chapter[];
  notpublish:Chapter[];
  theme:string;

  displayedColumns: string[] = ['sort','order','chapterName',
                                'publishedCreated','actions'];
  displayedColumns2: string[] = ['chapterName',
                                'publishedCreated','actions'];
  constructor(public storyChapterService:StorychapterService,
      private activitiesService:ActivitiesService,
      public storyService:StoryService) { }


  ngOnInit(): void {
      //this.storyChapterService.refreshList(this.storyService.formData.storyId,false);   
      // this.theme = localStorage.getItem('user-theme');
      // console.log(this.theme)
     this.loadpublish();
     this.loadnotpublish();
     
  }
  loadpublish(){
    this.storyChapterService.getPublished(this.storyService.formData.storyId,true)
    .subscribe(res => {
      this.published = res;
    });
  }
  loadnotpublish(){
    this.storyChapterService.getNotPublish(this.storyService.formData.storyId)
    .subscribe(res => {
       this.notpublish = res;
    })
  }
  populateForm(selectedRecord: Chapter) {
    //console.log(selectedRecord)
    this.storyChapterService.formData = Object.assign({},selectedRecord);
    this.goForm.emit(true);

  }
  chapterUp(selectedRow:Chapter){
    // this.storyChapterService.formData = Object.assign({},selectedRow);
    this.storyChapterService.putChapterUp(selectedRow.order).subscribe(
      res=>{
        console.log(res);
        this.loadpublish()
      },
      err=>{
        console.log(err);
      }
      
    );
  }
  chapterDown(selectedRow:Chapter){
    // this.storyChapterService.formData = Object.assign({},selectedRow);
    this.storyChapterService.putChapterDown(selectedRow.order).subscribe(
      res=>{
        console.log(res);
        this.loadpublish();
      },
      err=>{
        console.log(err);
      }
    )
  }
  publish(selectedRow:Chapter){
    //publish
    this.storyChapterService.putPublish(selectedRow.id).subscribe(
      res=>{
        //console.log(res);
        this.loadpublish();
        this.loadnotpublish();
      },
      err=>{
        console.log(err);
      }
    )
      this.activitiesService.postActivities(this.activitiesType,this.storyService.formData.storyName).subscribe(res =>{
        console.log(res);
      })
  }
}
