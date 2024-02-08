import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServiceService } from '../services/order-service.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  orderId: any;

  constructor(private router: Router,
    private orderService: OrderServiceService) {
    //   const navigation:any = this.router.getCurrentNavigation();
    //   const state = navigation.extras.state as {
    //     orderId: Number
    //  }
    //  this.orderId = state.orderId;
  }

  ngOnInit(): void {
 }
}
