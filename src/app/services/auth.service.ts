import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData, RTN } from '../interfaces/consRTN.interfaces';
import { VentasData } from '../interfaces/ventas.interface';
import { errorHandlerInterceptor } from '../interceptors/error-handler.interceptor';
import { Router } from '@angular/router';
import { AccesspointService } from './accesspoint.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private accesspointService: AccesspointService
  ) {}

  signin(data: any): Observable<any> {
    return this.http
      .post(`${environment.urLogin}/signin`, {
        email: data.email,
        password: data.password,
      })
      .pipe(catchError(this.errorHandler));
  }

  loggedIng() {
    if (typeof localStorage !== 'undefined') {
      // Your code that uses localStorage goes here
      const userDataString = localStorage.getItem('auth-user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        // console.log(userData.accessToken);
        const token = userData.accessToken;
        // console.log(token);
        if (token) {
          return true;
        } else {
          return false;
        }
      } else {
        // Handle the case when localStorage is not available
        return console.log('not found');
      }
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth-user');
    this.router.navigate(['/signin']);
  }

  // rol de usuario es admin
  isAdmin() {
    if (typeof localStorage !== 'undefined') {
      // Your code that uses localStorage goes here
      const userDataString = localStorage.getItem('auth-user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const rol = userData.roles[0];
        if (rol === 'ROLE_ADMIN') {
          return true;
        } else {
          return false;
        }
      } else {
        return console.error(
          'No se encontraron datos de usuario en la localstorage.'
        );
      }
    } else {
      // Handle the case when localStorage is not available
      return console.error('localStorage is not available role');
    }
  }

  errorHandler(error: any) {
    // console.log(error.error.message);
    console.error('Error en la petición:', error);
    return throwError({ error: error || 'Server Error' });
  }
}
