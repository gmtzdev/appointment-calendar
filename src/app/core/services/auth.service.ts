import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../../features/admin/models/user.model';

/**
 * Authentication service that handles user login, logout, and session management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize with stored user if available
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  /**
   * Authenticates user with email and password
   * @param email - User email
   * @param password - User password
   * @returns Observable with authentication result
   */
  login(email: string, password: string): Observable<{ user: User; token: string }> {
    // TODO: Replace with actual API call
    // For demo purposes, create a mock response
    const mockUser: User = {
      id: '1',
      email: email,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin' as any,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mockResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now()
    };

    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        // Mock validation (accept any email with password 'admin123')
        if (password === 'admin123') {
          // Store token and user data
          localStorage.setItem('auth_token', mockResponse.token);
          localStorage.setItem('current_user', JSON.stringify(mockResponse.user));
          this.currentUserSubject.next(mockResponse.user);
          observer.next(mockResponse);
          observer.complete();
        } else {
          observer.error({ status: 401, message: 'Invalid credentials' });
        }
      }, 1000); // Simulate network delay
    });

    // Uncomment below for real API implementation
    // return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/login`, {
    //   email,
    //   password
    // }).pipe(
    //   tap(response => {
    //     // Store token and user data
    //     localStorage.setItem('auth_token', response.token);
    //     localStorage.setItem('current_user', JSON.stringify(response.user));
    //     this.currentUserSubject.next(response.user);
    //   })
    // );
  }

  /**
   * Logs out the current user
   * @returns Observable void
   */
  logout(): Observable<void> {
    // Clear session immediately for mock implementation
    this.clearSession();
    
    // Return observable that completes immediately
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });

    // Uncomment below for real API implementation
    // return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
    //   tap(() => {
    //     this.clearSession();
    //   })
    // );
  }

  /**
   * Gets the current authenticated user
   * @returns Observable of current user or null
   */
  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  /**
   * Checks if user is currently authenticated
   * @returns Observable boolean indicating authentication status
   */
  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => !!user && !!this.getAuthToken())
    );
  }

  /**
   * Gets the stored authentication token
   * @returns Authentication token or null
   */
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Refreshes the authentication token
   * @returns Observable with new token
   */
  refreshToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/refresh`, {}).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  /**
   * Clears the current session data
   */
  private clearSession(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  /**
   * Retrieves stored user data from localStorage
   * @returns Stored user object or null
   */
  private getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem('current_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }


  /**
   * Request password reset user with email
   * @return Observable with the confirmation accept or deny
   */
  passwordReset(email: string){
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/passwordReset`, {
      email
    }).pipe(
      tap(response => {
        // Store token and user data
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('current_user', JSON.stringify(response.user));
      })
    );
  }
}
