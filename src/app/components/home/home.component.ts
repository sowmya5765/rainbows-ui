import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:any;

  constructor(private productService:ProductServiceService,
              private router:Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res:any)=>{
      console.log("resuuuuuuuu",res.data);
      this.products = res.data
    })
  }

  selectProduct(id:any){
    this.productService.getSingleProduct(id).subscribe((res:any)=>{
      console.log("resssssssssssssss",res.data);
      this.router.navigate(['/product'])
    })
  }

}
