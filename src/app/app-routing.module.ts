import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {  path:'',
    component:HomeComponent
  },
  {  path:'product/:id',
    component:ProductComponent
  },
  {  path:'cart',
    component:CartComponent
  },
  {  path:'checkout',
    canActivate: [AuthenticationGuard],
    component:CheckoutComponent
  },
  {  path:'thankyou',
    canActivate: [AuthenticationGuard],
    component:ThankyouComponent
  },
  {  path:'about',
    component:AboutComponent
  },
  {  path:'contact',
    component:ContactComponent
  },
  {  path:'category/:category',
    component:CategoryComponent
  },
  {  path:'auth',
    component:AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
