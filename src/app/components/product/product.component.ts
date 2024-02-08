import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { CartServiceService } from '../services/cart-service.service';
import { ProductServiceService } from '../services/product-service.service';
import {map} from "rxjs/operators";

declare let $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit,OnInit {

  id: any;
  product:any;
  thumbimages: any[] = [];


  @ViewChild('quantity') quantityInput:any;

  constructor(private cartService:CartServiceService,
    private route: ActivatedRoute,
    private productService:ProductServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe((res:any) => {
        this.product = res.data;
        if (res.data.imageUrl !== null) {
          this.thumbimages = res.data.imageUrl.split(';');
        }

      });
    });
  }

  ngAfterViewInit(): void {

    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  addToCart(id: Number) {
    this.cartService.addProduct(id, this.quantityInput.nativeElement.value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.inStock >= 1){
      value++;

      if (value > this.product.inStock) {
        value = this.product.inStock;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.inStock > 0){
      value--;

      if (value <= 0) {
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

}
