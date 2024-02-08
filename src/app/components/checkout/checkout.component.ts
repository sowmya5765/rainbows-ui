import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { OrderServiceService } from '../services/order-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService:CartServiceService,
              private orderService:OrderServiceService,
              private router:Router) { }

  cartTotalAmount:any;
  userCartData:any;

  ngOnInit(): void {
    this.cartService.cartTotal.subscribe(total=>this.cartTotalAmount=total);
    this.cartService.cartDataBS.subscribe(data=>this.userCartData=data);
    this.userCartData.total=5000;
    this.cartTotalAmount=1000;
    console.log("user dataaaaaaaaaaaa",this.userCartData)
  }

  onCheckout(){
    console.log("here???????????")
    this.router.navigate(['/thankyou'])
  }

}
