/**
 * Login credentials interface for user authentication
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Login response interface from authentication service
 */
export interface LoginResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Authenticated user information
 */
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
}

/**
 * User roles for authentication and authorization
 */
export enum UserRole {
  ADMIN = 'admin',
  DENTIST = 'dentist',
  STAFF = 'staff',
  PATIENT = 'patient'
}

/**
 * Password reset request interface
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation interface
 */
export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Change password interface for authenticated users
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Registration data interface for new users
 */
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

/**
 * Authentication error interface
 */
export interface AuthError {
  message: string;
  code: string;
  details?: string;
}
