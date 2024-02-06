import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  serviceUrl = environment.serviceUrl;

  constructor(private http:HttpClient) { }

  messageShow(){
    console.log("here")
  }

  getAllProducts(){
    return this.http.get<any>(`${this.serviceUrl}/product/getAllProducts`)
  }

  getSingleProduct(id:any){
    return this.http.post<any>(`${this.serviceUrl}/product/getProduct`,{id})
  }
}
