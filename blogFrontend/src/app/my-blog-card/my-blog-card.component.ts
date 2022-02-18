import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-my-blog-card',
  templateUrl: './my-blog-card.component.html',
  styleUrls: ['./my-blog-card.component.css']
})
export class MyBlogCardComponent implements OnInit {

  @Input() title: string='title';
  @Input() body: string='body';
  @Input() imageUrl: string='';
  @Input() id: number=0;
  @Input() isPublished: boolean =false;
  @Input() author: string='';
  @Input() createdAt: string='';
  @Output() changePublish= new EventEmitter<number>();
  @Output() delete= new EventEmitter<number>();
  constructor(private router: Router,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.createdAt= this.getDate(this.createdAt);
  }
  handleDelete(){
    this.delete.emit(this.id);
  }
  handleChangePublish(){
    const blogData= {
      id: this.id,
      title: this.title,
      body: this.body,
      isPublished: !this.isPublished
    }
    this.blogService.editPost({data : blogData}).subscribe(data=>{
      window.location.reload();
    })
  }
  handleEdit(){
    this.router.navigate([`editblog/${this.id}`])
  }
  getDate(value:string){
    return new Date(value).toDateString();
  }
}
