import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {  take } from 'rxjs/operators';
import { Banner } from 'src/app/_models/banner';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor-single',
  templateUrl: './photo-editor-single.component.html',
  styleUrls: ['./photo-editor-single.component.scss']
})
export class PhotoEditorSingleComponent implements OnInit {
  @Input() member: Member;
  
  uploader:FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  constructor(private accountService:AccountService,private memberService:MembersService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropzoneOver = e;
  }

  setMainBanner(banner:Banner){
    this.memberService.setMainBanner(banner.id).subscribe(() =>{
      //this.user.photoUrl = photo.url;
      //this.accountService.setCurrentUser(this.user);
      this.member.bannerUrl = banner.url;
      this.member.banners.forEach(p=>{
        if(p.isMain) p.isMain = false;
        if(p.id==banner.id)p.isMain = true;
      })
    })
  }

  deleteBanner(bannerId:number){
    this.memberService.deleteBanner(bannerId).subscribe(()=>{
        this.member.banners = this.member.banners.filter(x => x.id !== bannerId);
    })
  }
 
  initializeUploader(){
    this.uploader = new FileUploader({
      url:this.baseUrl + 'users/add-banner',
      authToken: 'Bearer ' + this.user.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024
    });
    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item,response,status,headers) =>{
      if(response){
        const banner: Banner = JSON.parse(response);
        this.member.banners.push(banner);
        if(banner.isMain){
          //this.user.bannerUrl = banner.url;
          this.member.bannerUrl = banner.url;
          //this.accountService.setCurrentUser(this.user);

        }
      }
    }
  }

}
