import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
  cards = [{
    id: 0,
    attributes: {
      title: "test",
      body: "testing",
      createdAt: '',
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
      },
      author:{
        data:[
          {
            attributes:{
              username: ''
            }
          }
        ]
      }
    }
  }]

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getMyPosts().subscribe((data: any)=> {
      this.cards = data.data;
      (data.data);
    })
  }
  handleDelete(id: any){
    this.blogService.deletePost(id).subscribe(data=>
      window.location.reload());
  }
  handleChangePublish(id : number){
    // this.cards[id].publish = !this.cards[id].publish;
    // (this.cards[id])
  }

}
