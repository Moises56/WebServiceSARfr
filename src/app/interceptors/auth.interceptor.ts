import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger;

  // Get the auth token from the service.
  const token = localStorage.getItem('token');
  console.log(token);
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    },
  });
  return next(cloneRequest);
};
