import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = {identifier: '', password: '' };
  msg='';
  formData = new FormGroup({
    email :new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password :new FormControl('', Validators.required)
  });
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
  handleLogin(){
    if(!this.formData.valid){
      this.msg = "Please enter valid values";
      return;
    }
    else{
      this.msg='';
    }
    this.data.identifier = this.formData.controls['email'].value;
    this.data.password= this.formData.controls['password'].value;

    this.userService.login(this.data).subscribe(data=>{
      localStorage.setItem('user', JSON.stringify(data));
      this.router.navigate(['/']);
    });
  }
}
