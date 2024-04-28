import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient,private router:Router) { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  logIn(body:any){
    this.loginApi(body).subscribe((res:any)=>{
      console.log("resuuuuuuuu",res.data);
      localStorage.setItem('authorization',res.data.accessToken)
      localStorage.setItem('userId',res.data.userId)
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/']);
    },(err)=>{
      alert('Failed To Login')
    })
  }

  loginApi(body:any){
    return this.http.post(`${environment.serviceUrl}/admin/login`,body)
  }

  logOut(body: any){
    this.logOutApi(body).subscribe((res:any)=>{
      console.log("resuuuuuuuu",res.data);
      localStorage.removeItem('authorization');
      this.router.navigate(['/']);
    })
  }

  logOutApi(body:any){
    return this.http.post(`${environment.serviceUrl}/admin/logout`,body)
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  
}
