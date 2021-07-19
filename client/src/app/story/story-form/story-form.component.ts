import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, reduce} from 'rxjs/operators';
import { MatChipInputEvent} from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import {  FormControl, NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Story } from 'src/app/_models/story.model';
import { StoryService } from 'src/app/_services/story.service';
import { Tags } from 'src/app/_models/tag';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  @Output() submitSuccess = new EventEmitter();
  @ViewChild('StoryTabs',{static:true}) StoryTabs: TabsetComponent;
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('TagInput') TagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  isCreate:boolean;
  GenreList : any=[];
  LanguageList : any=[];
  StateList : any=[];
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['Rainobu'];
  // allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  tagArray :string[]=[];

  // @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
  //   if(this.editForm.dirty){
  //     $event.returnValue = true;
  //   }
  //}
  constructor(public storyService:StoryService,
              private router:Router,
              private toastr:ToastrService) { 
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        map((tag: string | null) => tag ? this._filter(tag) : this.tagArray.slice()));
    }
  ngOnInit(): void {
    this.getGenreList();
    this.getLanguageList();
    this.getState();
    this.getAllTags(); 
    this.getTags();
  }
  uploadFinished = (event) =>{
    
    this.response = event;
    this.storyService.formData.imageUrl = this.ResoucreUrl + this.response.dbPath;
  }

  returnToStory(){
    //this.submitSuccess.emit(false);
    this.storyService.formData = new Story();
    this.router.navigate(['mystory']);
  }
  onSubmit(form:NgForm) {
    // console.log(form);
    if(this.storyService.formData.storyId == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.storyService.postStory().subscribe(
      res => {
        // console.log(res);
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
        this.router.navigate(['mystory'])
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
  getState(){
    this.storyService.getAllState().subscribe(res=>{
      this.StateList=res;
    });
  }
  getAllTags(){
   this.storyService.getAllTags()
        .subscribe( (res:Tags[]) => {
            this.tagArray = res.map(res => res.tagName);
        });
  }
  
  getTags(){
    if(this.storyService.formData.storyId != 0 && this.storyService.formData.tags != null)
      this.tags = this.storyService.formData.tags.split(",");
  }
  selectTab(tabId: number){
    this.StoryTabs.tabs[tabId].active = true;
    this.isCreate = true;
  }

  ChangeForm(event){
    this.isCreate = event;
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push(value);
      this.storyService.formData.tags = this.tags.join();
    }
    // Clear the input value
     //event.chipInput!.clear();
      event.input.value = '';
    //  this.TagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.TagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.storyService.formData.tags = this.tags.join();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.tagArray.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
