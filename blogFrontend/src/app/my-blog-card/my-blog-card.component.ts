import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output() changePublish= new EventEmitter<number>();
  @Output() delete= new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  handleDelete(){
    this.delete.emit(this.id);
  }
  handleChangePublish(){
    this.changePublish.emit(this.id);
  }
  handleEdit(){
    this.edit.emit(this.id);
  }
}
