import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:any;

  constructor(private productService:ProductServiceService,
              private router:Router,
              private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res:any)=>{
      console.log("resuuuuuuuu",res.data);
      this.products = res.data
    })
  }

  selectProduct(id:any){
    this.productService.getSingleProduct(id).subscribe((res:any)=>{
      console.log("resssssssssssssss",res.data);
      this.router.navigate(['/product',id])
    })
  }

  addToCart(id:any){
    this.cartService.addProduct(id)
  }

}
