import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

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
    this.loginApi(body).subscribe((res:any)=>{
      console.log("resuuuuuuuu",res.data);
      localStorage.setItem('authorization',res.data.accessToken)
      localStorage.setItem('userId',res.data.userId)
      this.router.navigate(['/']);
    },(err)=>{
      alert('Failed To Login')
    })
  }

  loginApi(body:any){
    return this.http.post(`${environment.serviceUrl}/admin/login`,body)
  }

}
