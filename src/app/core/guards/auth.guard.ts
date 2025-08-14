import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

/**
 * Authentication guard that protects routes requiring user login
 * Redirects unauthenticated users to the login page
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Determines if the user can activate the requested route
   * @param route - The activated route snapshot
   * @param state - The router state snapshot
   * @returns Observable boolean indicating access permission
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          // Store the attempted URL for redirecting after login
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url }
          });
        }
      }),
      map(isAuthenticated => isAuthenticated)
    );
  }
}
