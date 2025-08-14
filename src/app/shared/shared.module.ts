import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Shared module that contains commonly used components, directives, and pipes
 * that can be used across different feature modules.
 */
@NgModule({
  declarations: [
    // Add shared components, directives, and pipes here as they are created
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    // Re-export common modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Export shared components, directives, and pipes here
  ]
})
export class SharedModule { }
