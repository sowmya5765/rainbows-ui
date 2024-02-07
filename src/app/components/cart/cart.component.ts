import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartTotalAmt:any;
  userCartData:any;

  constructor(public cartService:CartServiceService) { }

  ngOnInit(): void {
    this.cartService.cartTotal.subscribe(total=>this.cartTotalAmt=total);
    this.cartService.cartDataBS.subscribe(data=>this.userCartData=data);
    console.log("user cart data",this.userCartData)
  }

  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.updateProductInCart(id, increaseQuantity);
  }

}
