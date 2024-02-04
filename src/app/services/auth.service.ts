import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData, RTN } from '../interfaces/consRTN.interfaces';
import { VentasData } from '../interfaces/ventas.interface';
import { errorHandlerInterceptor } from '../interceptors/error-handler.interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  
  signin(data: any): Observable<any>{
    return this.http.post(
      `${environment.urLogin}/signin`,
      {
        email: data.email,
        password: data.password
      }
    ).pipe(
      catchError(this.errorHandler)
    );
    
  }

  loggedIng(){
    // si el token existe retorna true si no false 
    
    if (typeof localStorage !== 'undefined') {
      // Your code that uses localStorage goes here
      return !!localStorage.getItem('token');
    } else {
      // Handle the case when localStorage is not available
      return console.error('localStorage is not available');
    }
  
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('auth-user');
    this.router.navigate(['/signin']);
  }


  errorHandler(error: any) {
    // console.log(error.error.message);
    console.error('Error en la petición:', error);
    return throwError({ error: error || "Server Error" });
  }


}
