import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtService } from '../services/authentication/jwt.service';
import {AuthService} from "../ui/modules/authentication/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router = inject(Router)
  jwtService = inject(JwtService);

  constructor() {}

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
