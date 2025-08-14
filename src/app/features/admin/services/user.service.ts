import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { 
  User, 
  CreateUserDto, 
  UpdateUserDto, 
  UserRole 
} from '../models/user.model';

/**
 * Service for managing users in the administration system.
 * Handles CRUD operations and user-specific business logic.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all users with optional filtering and pagination
   * @param role - Optional role filter
   * @param isActive - Optional active status filter
   * @param page - Page number for pagination (default: 1)
   * @param limit - Number of items per page (default: 10)
   * @returns Observable array of users
   */
  getUsers(
    role?: UserRole, 
    isActive?: boolean, 
    page: number = 1, 
    limit: number = 10
  ): Observable<{ users: User[]; total: number; page: number; limit: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (role) {
      params = params.set('role', role);
    }
    
    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    return this.http.get<{ users: User[]; total: number; page: number; limit: number }>(
      this.apiUrl, 
      { params }
    );
  }

  /**
   * Retrieves a specific user by ID
   * @param id - User ID
   * @returns Observable user object
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new user
   * @param userData - User creation data
   * @returns Observable created user object
   */
  createUser(userData: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }

  /**
   * Updates an existing user
   * @param id - User ID to update
   * @param userData - Partial user update data
   * @returns Observable updated user object
   */
  updateUser(id: string, userData: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }

  /**
   * Deactivates a user (soft delete)
   * @param id - User ID to deactivate
   * @returns Observable void
   */
  deactivateUser(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  /**
   * Reactivates a user
   * @param id - User ID to reactivate
   * @returns Observable void
   */
  reactivateUser(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/reactivate`, {});
  }

  /**
   * Permanently deletes a user (hard delete)
   * @param id - User ID to delete
   * @returns Observable void
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Searches users by name or email
   * @param searchTerm - Search term to match against name or email
   * @param limit - Maximum number of results (default: 10)
   * @returns Observable array of matching users
   */
  searchUsers(searchTerm: string, limit: number = 10): Observable<User[]> {
    const params = new HttpParams()
      .set('search', searchTerm)
      .set('limit', limit.toString());

    return this.http.get<User[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Resets a user's password and sends email notification
   * @param id - User ID
   * @returns Observable void
   */
  resetUserPassword(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/reset-password`, {});
  }
}
