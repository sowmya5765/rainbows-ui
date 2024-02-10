import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userCartData:any;
  cartTotalAmt:any;
  isDropdownOpen: boolean = false;

  constructor(public cartService:CartServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartTotal.subscribe(total=>this.cartTotalAmt = total);
    this.cartService.cartDataBS.subscribe(data=>this.userCartData = data);
    console.log("userCartData.items[0].inCart !== 0",this.userCartData,this.userCartData.items[0].inCart !== 0)
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
