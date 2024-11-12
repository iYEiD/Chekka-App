import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HelperFunctions } from '../../common/helper-functions';
import { JwtService } from '../services/authentication/jwt.service';
import { AuthenticationMiddlewareService } from 'src/app/entities/authentication/middleware/authentication-middleware.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService,

    private authenticationMS: AuthenticationMiddlewareService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/').then(() => {});
      return false;
    }
    return true;
  }

  isLoggedIn(): boolean {
    return this.jwtService.isLoggedIn();
  }
}
