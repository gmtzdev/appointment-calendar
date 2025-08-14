/**
 * Patient model representing dental patients
 */
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: Address;
  medicalHistory?: MedicalHistory;
  emergencyContact: EmergencyContact;
  insurance?: InsuranceInfo;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastVisit?: Date;
  nextAppointment?: Date;
}

/**
 * Address information for patients
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Medical history information
 */
export interface MedicalHistory {
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  notes?: string;
  lastUpdated: Date;
}

/**
 * Emergency contact information
 */
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

/**
 * Insurance information
 */
export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expirationDate: Date;
}

/**
 * Data transfer object for creating a new patient
 */
export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: Address;
  emergencyContact: EmergencyContact;
  medicalHistory?: Partial<MedicalHistory>;
  insurance?: InsuranceInfo;
}

/**
 * Data transfer object for updating an existing patient
 */
export interface UpdatePatientDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
  medicalHistory?: Partial<MedicalHistory>;
  insurance?: InsuranceInfo;
  isActive?: boolean;
}
