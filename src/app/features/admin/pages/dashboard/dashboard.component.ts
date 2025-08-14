import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

/**
 * Dashboard component displaying key metrics and overview information
 * for the dental administration system
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  dashboardData$: Observable<DashboardData> | undefined;
  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Loads all dashboard data using parallel requests
   */
  private loadDashboardData(): void {
    this.isLoading = true;
    
    // Example of combining multiple service calls
    this.dashboardData$ = forkJoin({
      totalUsers: this.userService.getUsers().pipe(map(response => response.total)),
      activeUsers: this.userService.getUsers(undefined, true).pipe(map(response => response.total)),
      recentUsers: this.userService.getUsers(undefined, undefined, 1, 5).pipe(map(response => response.users))
    }).pipe(
      map(data => ({
        ...data,
        userGrowth: this.calculateGrowthPercentage(data.totalUsers, data.totalUsers - 10) // Mock calculation
      }))
    );

    this.dashboardData$.subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Calculates growth percentage between current and previous values
   * @param current - Current period value
   * @param previous - Previous period value
   * @returns Growth percentage
   */
  private calculateGrowthPercentage(current: number, previous: number): number {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  }

  /**
   * Refreshes dashboard data
   */
  refreshData(): void {
    this.loadDashboardData();
  }
}

/**
 * Interface defining the structure of dashboard data
 */
interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  recentUsers: User[];
  userGrowth: number;
}
