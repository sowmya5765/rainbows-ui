import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router, public authService: AuthserviceService) { }

  ngOnInit(): void {
  }

  login(authForm: NgForm){
    console.log("Username:", authForm.value.username);
    console.log("Password:", authForm.value.password);
    let body:any ={}
    if(authForm.value.username && authForm.value.password){
      body.emailId = authForm.value.username;
      body.password = authForm.value.password;
    }else{
      alert(`Enter email and password!!`)
    }
    this.authService.logIn(body);
  }

}
