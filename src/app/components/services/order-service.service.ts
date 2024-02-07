import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  serviceUrl = environment.serviceUrl;

  constructor(private http: HttpClient,private router:Router) { }

  getOrder(id:any){
    return this.http.post(`${this.serviceUrl}/order/getOrder`,{id})
  }
}
