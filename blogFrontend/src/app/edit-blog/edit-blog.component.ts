import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogDetail = {file: ''};
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
    private router: Router,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.blogService.getPostById(this.route.snapshot.params['id']).subscribe(data=>{
      this.blogData.controls['title'].setValue(data.data[0].attributes.title)
      this.blogData.controls['body'].setValue(data.data[0].attributes.body)
    })
  }

  handleEdit(){
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
      id: this.route.snapshot.params['id']
    }
    if(this.file!=this.blogDetail.file){
    this.blogService.uploadImage(this.file, blog);
    }
    else{
      this.blogService.editPost({data: blog}).subscribe(data=>console.log(data));
      console.log('reached')
    }
    
  }
  handleFileChange(event: any){
    this.file = event.target.files[0];
  }

}
