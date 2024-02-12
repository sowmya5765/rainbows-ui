import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import { ProductServiceService } from '../services/product-service.service';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryData:any;
  category:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private productService:ProductServiceService,
    private cartService:CartServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.category;
      })
    ).subscribe(category => {
      this.category = category
      console.log("categoryyyyyyy")
      this.productService.getCategoryProducts(category).subscribe((res:any) => {
        this.categoryData = res.data;
        console.log("jnsdksndlksl",this.categoryData);
      });
    });
  }

  selectProduct(id:any){
    this.productService.getSingleProduct(id).subscribe((res:any)=>{
      this.router.navigate(['/product',id])
    })
  }

  addToCart(id:any){
    this.cartService.addProduct(id)
  }

}
