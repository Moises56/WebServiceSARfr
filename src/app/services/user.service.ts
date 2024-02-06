import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData, RTN } from '../interfaces/consRTN.interfaces';
import { User } from '../interfaces/user.interfaces';
import { errorHandlerInterceptor } from '../interceptors/error-handler.interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // Get all users
  getUsers(): Observable<User> {
    return this.http
      .get<User>(`${environment.urlUser}/allusers`)
      .pipe(catchError(this.errorHandler));
  }

  // Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${environment.urlUser}/search/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  // Create user
  createUser(data: any): Observable<any> {
    return this.http
      .post(`${environment.urlUser}/saveuser`, data)
      .pipe(catchError(this.errorHandler));
  }

  // editar usuario
  updateUser(data: any): Observable<any> {
    return this.http
      .put(`${environment.urlUser}/update/${data.id}`, data)
      .pipe(catchError(this.errorHandler));
  }

  // Delete user
  deleteUser(id: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.urlUser}/delete/${id}`)
      .pipe(catchError(this.errorHandler));
  }





  errorHandler(error: any) {
    // console.log(error.error.message);
    console.error('Error en la petición:', error);
    return throwError({ error: error || 'Server Error' });
  }





}
