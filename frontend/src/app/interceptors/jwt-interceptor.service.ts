import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { JwtService } from '../services/authentication/jwt.service';
import {AuthService} from "../ui/modules/authentication/services/auth.service";
import {environment} from "../../environments/environment";
import {LoginViewModel} from "../models/authentication/interfaces/authentication.models";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService)
  jwtService = inject(JwtService);

  static backendBaseUrl = environment.backendUrl

  updateRequest(request: HttpRequest<unknown>, accessToken: string) {
    let updatedRequest = request.clone()


    if (request.url !== `${AuthInterceptor.backendBaseUrl}/auth/sign-in` && request.url !== `${AuthInterceptor.backendBaseUrl}/auth/refresh-tokens`) {
      updatedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return updatedRequest
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.jwtService.getAccessToken()!;
    const refreshToken = this.jwtService.getRefreshToken();

    let authenticatedRequest = this.updateRequest(request, accessToken)

    return next.handle(authenticatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!refreshToken || this.jwtService.getIsRefreshTokenExpired()) {
            this.authService.logout()
            return throwError(error);
          }

          return this.authService.refreshToken().pipe(
            switchMap((response: LoginViewModel) => {
              const newAccessToken = response.tokens.accessToken;
              const newRefreshToken = response.tokens.refreshToken;

              this.jwtService.setTokens(newAccessToken, newRefreshToken);
              // set user in auth service to user from ressponse
              return next.handle(this.updateRequest(request, newAccessToken));
            }),
            catchError((refreshError) => {
              this.authService.logout();
              return throwError(refreshError);
            })
          );
        }
        return throwError(error)
      })
    );
  }
}
