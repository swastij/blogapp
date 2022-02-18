import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() title: string='title';
  @Input() body: string='body';
  @Input() imageUrl: string='';
  constructor() { }

  ngOnInit(): void {
  }
}
