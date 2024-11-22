import { HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { TokenstorageService } from '../auth/service/tokenstorage.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the TokenstorageService to retrieve the authentication token.
  const authToken = inject(TokenstorageService);

  // Clone the request to add the authentication header.
  const newReq = authToken.getToken()
    ? req.clone({
        headers: req.headers.append(
          TOKEN_HEADER_KEY,
          `Bearer ${authToken.getToken().accessToken}`
        ),
      })
    : req;

  return next(newReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
        }
      },
      error: (error) => {},
    }),
    catchError((error) => {
      if (error.status == 401) {
        authToken.signOut();
      }
      return throwError(() => error);
    })
  );
}
