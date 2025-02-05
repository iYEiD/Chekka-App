import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/authentication/jwt.service';
import {AuthService} from "../ui/modules/authentication/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService)
  jwtService = inject(JwtService);

  updateRequest(request: HttpRequest<unknown>, accessToken: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.jwtService.getAccessToken()!;

    let authenticatedRequest = this.updateRequest(request, accessToken)

    return next.handle(authenticatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout()
        }
        return throwError(error)
      })
    );
  }
}
