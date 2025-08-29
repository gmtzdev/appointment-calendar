import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetRequest } from '../../models/auth.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/admin/dashboard';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ){
    this.forgotPasswordForm = this.createLoginForm();
  }

  /**
   * Creates the reactive form for login with validation
   * @returns FormGroup with email and password controls
   */
  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }



  /**
   * Handles form submission and user authentication
   */
  protected onSubmit(): void {
    if (this.forgotPasswordForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials: PasswordResetRequest = {
        email: this.forgotPasswordForm.value.email
      };

      this.authService.passwordReset(credentials.email).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Redirect to return URL or admin dashboard on successful login
          // this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          // this.handleLoginError(error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }



  /**
   * Checks if a form field has a specific error
   * @param fieldName - Name of the form field
   * @param errorType - Type of validation error
   * @returns Boolean indicating if the error exists
   */
  hasFieldError(fieldName: string, errorType: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.errors?.[errorType] && (field.dirty || field.touched));
  }


  /**
   * Gets the error message for a specific field
   * @param fieldName - Name of the form field
   * @returns Error message string
   */
  getFieldErrorMessage(fieldName: string): string {
    const field = this.forgotPasswordForm.get(fieldName);
    if (!field || !field.errors || (!field.dirty && !field.touched)) {
      return '';
    }

    if (field.errors['required']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (field.errors['minlength']) {
      return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    
    return 'Invalid input';
  }

  /**
   * Marks all form controls as touched to trigger validation display
   */
  private markFormGroupTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
