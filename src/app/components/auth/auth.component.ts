import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(authForm: NgForm){
    console.log("Username:", authForm.value.username);
    console.log("Password:", authForm.value.password);
  }

}
