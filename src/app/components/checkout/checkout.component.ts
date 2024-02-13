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
  address:any;
  city:any;
  state:any;
  pinCode:any;
  orderNotes:any;

  ngOnInit(): void {
    this.cartService.cartTotal.subscribe(total=>this.cartTotalAmount=total);
    this.cartService.cartDataBS.subscribe(data=>this.userCartData=data);
    console.log("user dataaaaaaaaaaaa",this.userCartData)
  }

  onCheckout(){
    let data:any =[];
    if(this.address==''|| this.pinCode==''){
      this.cartService.showAlert('Please add Address and Pincode')
      return;
    }
    let body={
      items:[],
      amtPaid:0,
      address:this.address,
      city:this.city,
      state:this.state,
      pinCode:this.pinCode,
      status:'CONFIRMED',
    };
    for(let item of this.userCartData.items){
      let obj = {
        id:item.product.id,
        quantity:item.inCart
      }
      data.push(obj);
    }
    body.items = data;
    body.amtPaid = this.cartTotalAmount;
    this.cartService.checkOutAndOrder(body);
  }

}
