import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  msg='';
  file: any ='';
  blogData = new FormGroup({
    title: new FormControl('',Validators.required) ,
    body: new FormControl('',Validators.required),
    isPublished: new FormControl(true)
  })
  formData= new FormData();
  selectedFile: boolean = false;
  constructor(private blogService : BlogService,
    private router: Router) { }

  ngOnInit(): void {
    // let a =localStorage.getItem('user');
    // if(a){
    // ('stored data', JSON.parse(a));
    // }
  }
  handleCreate(){
    if(!this.blogData.valid){
      this.msg='Please enter valid values';
    }
    else{
      this.msg='';
    }
    const blog = {
      title: this.blogData.controls['title'].value,
      body: this.blogData.controls['body'].value,
      isPublished: this.blogData.controls['isPublished'].value,
    }
    this.blogService.uploadImage(this.file, blog);
    
  }
  handleFileChange(event: any){
    (event.target.files)
    this.file = event.target.files[0];
  }
}
