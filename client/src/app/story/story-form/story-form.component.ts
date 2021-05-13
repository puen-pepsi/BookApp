import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { Story } from 'src/app/_models/story.model';
import { PhotoService } from 'src/app/_services/photo.service';
import { StoryService } from 'src/app/_services/story.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  @Output() submitSuccess = new EventEmitter();
  @ViewChild('StoryTabs',{static:true}) StoryTabs: TabsetComponent;
  isCreate:boolean;
  GenreList : any=[];
  LanguageList : any=[];
  response:{dbPath:''};
  constructor(public storyService:StoryService,
    private photoSevice:PhotoService,
    private toastr:ToastrService) { }
  ngOnInit(): void {
    this.getGenreList();
    this.getLanguageList();
  }
  uploadFinished = (event) =>{
    
    this.response = event;
    this.storyService.formData.imageUrl = this.response.dbPath;
  }

  returnToStory(){
    this.submitSuccess.emit(false);
    this.storyService.formData = new Story();
  }
  onSubmit(form:NgForm) {
    // console.log(form);
    if(this.storyService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.storyService.postStory().subscribe(
      res => {
        console.log(res);
        // this.photoSevice.upload()
        this.resetForm(form);
        this.storyService.refreshList();
        this.submitSuccess.emit(false);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.storyService.putStory().subscribe(
      res => {
        this.resetForm(form);
        this.storyService.refreshList();
        this.submitSuccess.emit(false);
        this.toastr.success("Add Story Success","Information")
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.storyService.formData = new Story();
  }
  getGenreList(){
    this.storyService.getAllGenre().subscribe(res =>{
      this.GenreList=res;
    });
  }
  getLanguageList(){
    this.storyService.getAllLanguage().subscribe(res =>{
      this.LanguageList=res;
    });
  }
  selectTab(tabId: number){
    this.StoryTabs.tabs[tabId].active = true;
    this.isCreate = true;
  }
  ChangeForm(event){
    this.isCreate = event;
  }
}
