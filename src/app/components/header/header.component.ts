import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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

  constructor(public cartService:CartServiceService,
    private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.cartService.cartTotal.subscribe(total=>this.cartTotalAmt = total);
    this.cartService.cartDataBS.subscribe(data=>this.userCartData = data);
    if(localStorage.getItem('authorization')){
      this.SignInStatus = 'Logout'
    }
  }

  userSignInOrSignOut(){
    if(this.SignInStatus=='Logout'){
      let body:any ={};
      if(localStorage.getItem('userId')){
        body.id = localStorage.getItem('userId');
      }
      this.loginOut(body).subscribe((res:any)=>{
        console.log("resuuuuuuuu",res.data);
        localStorage.removeItem('authorization');
        this.SignInStatus = 'Login';
        this.router.navigate(['/']);
      })
    }else{
        this.router.navigate(['/auth']);
    }
  }

  loginOut(body:any){
    return this.http.post(`${environment.serviceUrl}/admin/logout`,body)
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
