import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = {username:'', email: '', password: '' };
  msg='';
  formData = new FormGroup({
    username :new FormControl('', [Validators.required, Validators.pattern(/^([a-z]+)+$/i)]),
    email :new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password :new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
  handleRegister(){
     
    if(!this.formData.valid){
      this.msg = "Please enter valid values";
      return;
    }
    else{
      this.msg='';
    }
    this.data.username = this.formData.controls['username'].value;
    this.data.email = this.formData.controls['email'].value;
    this.data.password= this.formData.controls['password'].value;
    // ('form data in register',this.data);

    this.userService.register(this.data).subscribe(data=>
      this.router.navigate(['/login']));
  }

}
