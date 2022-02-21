import { Component, HostListener, OnInit, SimpleChange } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blogFrontend';
  ngOnInit(){
  }
  constructor(public userService: UserService){
  }
  handleLogout(){
    localStorage.removeItem('user');
  }
}
