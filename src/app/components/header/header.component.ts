import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userCartData:any;
  cartTotalAmt:any;
  isDropdownOpen: boolean = false;
  SignInStatus = 'Login';

  constructor(public cartService:CartServiceService, public authService: AuthserviceService,
    private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.cartService.cartTotal.subscribe(total=>this.cartTotalAmt = total);
    this.cartService.cartDataBS.subscribe(data=>this.userCartData = data);
    if(localStorage.getItem('authorization')){
      this.SignInStatus = 'Logout'
    }

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if(isAuthenticated == true){
        this.SignInStatus = 'Logout'
      } else {
        this.SignInStatus = 'Login'
      }
    });
  }

  userSignInOrSignOut(){
    if(this.SignInStatus=='Logout'){
      let body:any ={};
      if(localStorage.getItem('userId')){
        body.id = localStorage.getItem('userId');
      }
      body.status = "INACTIVE";
      this.authService.logOut(body);
      this.SignInStatus = 'Login';
    }else{
        this.router.navigate(['/auth']);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
