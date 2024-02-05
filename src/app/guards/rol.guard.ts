import { CanActivateFn, CanMatchFn, Router  } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const rolGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  

  // return authService.loggedIng();

  if (authService.isAdmin()){
    return true;
  }
  router.navigate(['/not-authorized']);
  return false;
};
