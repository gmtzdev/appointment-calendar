/**
 * Appointment model representing dental appointments
 */
export interface Appointment {
  id: string;
  patientId: string;
  dentistId: string;
  appointmentDate: Date;
  duration: number; // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  treatmentPlan?: TreatmentPlan;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  // Navigation properties
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  dentist?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * Types of dental appointments
 */
export enum AppointmentType {
  CONSULTATION = 'consultation',
  CLEANING = 'cleaning',
  FILLING = 'filling',
  ROOT_CANAL = 'root_canal',
  EXTRACTION = 'extraction',
  CROWN = 'crown',
  ORTHODONTICS = 'orthodontics',
  EMERGENCY = 'emergency',
  FOLLOWUP = 'followup'
}

/**
 * Status of appointments
 */
export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  RESCHEDULED = 'rescheduled'
}

/**
 * Treatment plan for appointments
 */
export interface TreatmentPlan {
  procedures: string[];
  estimatedCost: number;
  estimatedDuration: number; // in minutes
  notes?: string;
  requiredFollowUp?: boolean;
  nextAppointmentDate?: Date;
}

/**
 * Data transfer object for creating a new appointment
 */
export interface CreateAppointmentDto {
  patientId: string;
  dentistId: string;
  appointmentDate: Date;
  duration: number;
  type: AppointmentType;
  notes?: string;
  treatmentPlan?: TreatmentPlan;
}

/**
 * Data transfer object for updating an existing appointment
 */
export interface UpdateAppointmentDto {
  appointmentDate?: Date;
  duration?: number;
  type?: AppointmentType;
  status?: AppointmentStatus;
  notes?: string;
  treatmentPlan?: TreatmentPlan;
}

/**
 * Appointment search and filter criteria
 */
export interface AppointmentSearchCriteria {
  patientId?: string;
  dentistId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: AppointmentStatus;
  type?: AppointmentType;
  page?: number;
  limit?: number;
}
