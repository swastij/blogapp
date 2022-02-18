import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards = [{
    id: 0,
    attributes: {
      title: "test",
      body: "testing",
      createdAt: "2022-02-17T07:14:04.756Z",
      updatedAt: "2022-02-17T13:08:51.254Z",
      publishedAt: "2022-02-17T07:16:13.428Z",
      isPublished: true,
      image: {
        data: {
          id: 1,
          attributes: {
            formats: {
              medium: {
                url: "http://localhost:1337/uploads/thumbnail_Screenshot_from_2022_02_16_19_39_50_f36434e20d.png"
              }
            }
          }
        }
      }
    }
  }]

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getAllPosts().subscribe(data => {
      this.cards = data.data;
    })
  }
}
