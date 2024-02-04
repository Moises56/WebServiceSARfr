import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // return authService.loggedIng();

  if (authService.loggedIng()){
    return true;
  }
  router.navigate(['/signin']);
  return false;

};
