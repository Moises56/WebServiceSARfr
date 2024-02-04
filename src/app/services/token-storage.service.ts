import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'auth-token';
const USER = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private authService: AuthService) { }


  intercept(req: any, next: any){
    const tokenizeReq = req.clone({
       setHeaders: {
         Authorization: `Bearer ${this.authService.getToken()}`
       }
     });
    return next.handle(tokenizeReq);
   }
  

  

  
}
