import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../core/services/auth.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

/**
 * Main layout component for the admin section
 * Provides the overall structure including sidebar and header navigation
 */
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  imports: [RouterOutlet,  CommonModule]
})
export class AdminLayoutComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isSidebarCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  /**
   * Toggles the sidebar collapsed state
   */
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  /**
   * Handles user logout
   */
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Force logout even if server call fails
        this.router.navigate(['/login']);
      }
    });
  }
}
