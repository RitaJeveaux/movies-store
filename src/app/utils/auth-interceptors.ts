import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.isTokenExpired()) {
    authService.logout();
    return next(req);
  }

  const token = authService.getToken();
  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        authService.logout();
      }
      return throwError(() => err)
    })
  );
}