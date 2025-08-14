/**
 * User model representing system users (dentists, staff, admins)
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  avatar?: string;
  phone?: string;
}

/**
 * User roles available in the system
 */
export enum UserRole {
  ADMIN = 'admin',
  DENTIST = 'dentist',
  STAFF = 'staff',
  PATIENT = 'patient'
}

/**
 * Data transfer object for creating a new user
 */
export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  password: string;
}

/**
 * Data transfer object for updating an existing user
 */
export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
  phone?: string;
  avatar?: string;
}
