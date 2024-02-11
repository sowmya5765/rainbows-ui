import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras,Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { OrderServiceService } from './order-service.service';
import { BehaviorSubject } from 'rxjs';
import { ProductServiceService } from './product-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartData ={
    total:0,
    items:[{
      inCart:0,
      product:undefined
    }]
  }

  clientCartData ={
    total:0,
    products:[{
      inCart:0,
      id:0
    }]
  }

  serviceUrl = environment.serviceUrl;
  cartTotal = new BehaviorSubject<number>(0);
  cartDataBS = new BehaviorSubject<any>(this.cartData)

  constructor( private http: HttpClient,private router:Router,private orderService:OrderServiceService,private productService:ProductServiceService) { 
    this.cartTotal.next(this.cartData.total);
    this.cartDataBS.next(this.cartData);

    let cartDataString:any = localStorage.getItem('cart');
    let cartInfo;
    if(cartDataString!=null){
      cartInfo = JSON.parse(cartDataString);
      this.clientCartData= cartInfo;

      this.clientCartData.products.forEach((element) => {
        this.productService.getSingleProduct(element.id).subscribe((res:any)=>{
          if(this.cartData.items[0].inCart == 0){
            this.cartData.items[0].inCart = element.inCart;
            this.cartData.items[0].product = res.data;

            this.clientCartData.total = this.cartData.total;
            localStorage.setItem('cart',JSON.stringify(this.clientCartData))
          }else{
            this.cartData.items.push({
              inCart:element.inCart,
              product:res.data
            })
            this.calculateTotal();
            this.clientCartData.total = this.cartData.total;
            localStorage.setItem('cart',JSON.stringify(this.clientCartData))
          }
          this.cartDataBS.next({...this.cartData});
        })
      });
    }
  }

  addProduct(id:any,amt?:number){
    this.productService.getSingleProduct(id).subscribe((res:any)=>{
      if(this.cartData.items[0].product == undefined){
        this.cartData.items[0].product = res.data;
        this.cartData.items[0].inCart = amt != undefined?amt:1;
        this.calculateTotal()
        this.clientCartData.products[0].inCart = this.cartData.items[0].inCart;
        this.clientCartData.products[0].id = res.data.id;
        this.clientCartData.total = this.cartData.total;
        localStorage.setItem('cart',JSON.stringify(this.clientCartData));
        this.cartDataBS.next({...this.cartData});
        this.showAlert('Product added to the cart')
      }else{
        console.log("this cart data..",this.cartData,res.data.id);
        let index = this.cartData.items.findIndex((ele:any)=>ele.product.id == res.data.id);
        if(index!=-1){
          if(amt!=undefined && amt < res.data.inStock){
            this.cartData.items[index].inCart = this.cartData.items[index].inCart < res.data.inStock? amt: res.data.inStock
          }else{
            this.cartData.items[index].inCart < res.data.inStock? this.cartData.items[index].inCart++ : res.data.inStock
          }
          this.clientCartData.products[index].inCart = this.cartData.items[index].inCart;
          this.showAlert('Product updated in the cart')
        }else{
          this.cartData.items.push({
            product: res.data,
            inCart: 1
          });
          this.clientCartData.products.push({
            inCart: 1,
            id: res.data.id
          });
          this.showAlert('Product added to the cart')
        }    
        this.calculateTotal();  
        this.clientCartData.total = this.cartData.total;
        localStorage.setItem('cart',JSON.stringify(this.clientCartData))
        this.cartDataBS.next({...this.cartData});
      }
    })
  }

  updateProductInCart(index:any, increase: Boolean) {
    let data:any = this.cartData.items[index];
    if (increase) {
      data.inCart < data.product.inStock? data.inCart++ : data.product.inStock;
      this.clientCartData.products[index].inCart = data.inCart;
      this.calculateTotal();
      this.clientCartData.total = this.cartData.total;
      this.cartDataBS.next({...this.cartData});
      localStorage.setItem('cart', JSON.stringify(this.clientCartData));
    } else {
      data.inCart--;
      if (data.inCart < 1) {
        this.deleteProductInCart(index);
        this.cartDataBS.next({...this.cartData});
      } else {
        this.cartDataBS.next({...this.cartData});
        this.clientCartData.products[index].inCart = data.inCart;
        this.calculateTotal();
        this.clientCartData.total = this.cartData.total;
        localStorage.setItem('cart', JSON.stringify(this.clientCartData));
      }

    }

  }

  deleteProductInCart(index:any) {
    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartData.items.splice(index, 1);
      this.clientCartData.products.splice(index, 1);
      this.calculateTotal();
      this.clientCartData.total = this.cartData.total;

      if (this.clientCartData.total === 0) {
        this.clientCartData = {products: [{inCart: 0, id: 0}], total: 0};
        localStorage.setItem('cart', JSON.stringify(this.clientCartData));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.clientCartData));
      }

      if (this.cartData.total === 0) {
        this.cartData = {
          items: [{
            product: undefined,
            inCart: 0
          }],
          total: 0
        };
        this.cartDataBS.next({...this.cartData});
      } else {
        this.cartDataBS.next({...this.cartData});
      }
    }
    else {
      return;
    }


  }

  calculateTotal() {
    let Total = 0;

    this.cartData.items.forEach((item:any) => {
      const {inCart} = item;
      const {price} = item.product;
      Total += inCart * price;
    });
    this.cartData.total = Total;
    this.cartTotal.next(this.cartData.total);
  }

  paymentUpdationandCheckout(id:any){   
    this.http.post(`${this.serviceUrl}/order/paymentUpdation`,{id}).subscribe((res:any)=>{
      if(res.status=='success'){
        this.resetCartData();
        this.http.post(`${this.serviceUrl}/order/createOrder`,{
          userId:id,
          status:"COMPLETED",
          amtPaid:this.clientCartData.total,
          item:[]
        }).subscribe((res:any)=>{      
          if(res.data){
            const navigationExtras: NavigationExtras = {
              state: {
                message: res.data.message,
                products: res.data.items,
                orderId: res.data.id,
                total: this.clientCartData.total
              }
            };
            this.router.navigate(['/thankyou'], navigationExtras).then(p => {
              this.clientCartData = {products: [{inCart: 0, id: 0}], total: 0};
              this.cartTotal.next(0);
              localStorage.setItem('cart', JSON.stringify(this.clientCartData));
            });
          }
        })
      }else {
        this.router.navigateByUrl('/checkout').then();
        this.showAlert('Failed to book the order')
      }
    })
  }

  CalculateSubTotal(index:any){
    let subTotal = 0;

    let p:any = this.cartData.items[index];
    subTotal = p.product.price * p.inCart;

    return subTotal;
  }

  resetCartData(){
    this.cartData = {
      total:0,
      items:[{
        inCart:0,
        product:undefined
      }]
    }
    this.cartDataBS.next({...this.cartData});
  }

  showAlert(msg:String) {
    alert(`${msg}`);
  }
  

}
