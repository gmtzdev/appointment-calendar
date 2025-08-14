import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../models/user.model';

/**
 * Guard that protects admin routes by verifying user has admin role
 * Redirects unauthorized users to login or access denied page
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Determines if the current user can activate admin routes
   * @returns Observable boolean indicating access permission
   */
  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map(user => {
        // Check if user exists and has admin role
        if (user && (user.role === UserRole.ADMIN || user.role === UserRole.DENTIST)) {
          return true;
        }

        // If user is logged in but doesn't have admin access
        if (user) {
          this.router.navigate(['/access-denied']);
          return false;
        }

        // If user is not logged in, redirect to login
        this.router.navigate(['/login']);
        return false;
      }),
      catchError(() => {
        // On error, redirect to login
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
