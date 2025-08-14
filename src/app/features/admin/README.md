# Administration System Directory Structure

This document outlines the directory structure for the dental application's administration system, following Angular best practices and clean architecture principles.

## Overall Structure

```
src/app/
├── core/                     # Singleton services, guards, interceptors
│   ├── guards/              # Route guards (auth, admin, etc.)
│   ├── interceptors/        # HTTP interceptors
│   ├── models/              # Core application models
│   └── services/            # Core singleton services
├── shared/                   # Shared components, services, pipes, directives
│   ├── components/          # Reusable UI components
│   ├── directives/          # Custom directives
│   ├── models/              # Shared data models
│   ├── pipes/               # Custom pipes
│   └── services/            # Shared services
└── features/                # Feature modules
    └── admin/               # Administration feature module
        ├── components/      # Admin-specific components
        │   ├── layout/      # Layout components (header, sidebar, etc.)
        │   └── shared/      # Admin-specific shared components
        ├── guards/          # Admin-specific guards
        ├── models/          # Admin-specific models
        ├── pages/           # Page components
        │   ├── dashboard/   # Dashboard page
        │   ├── users/       # User management pages
        │   ├── patients/    # Patient management pages
        │   ├── appointments/# Appointment management pages
        │   └── settings/    # Settings page
        └── services/        # Admin-specific services
```

## Architecture Principles

### 1. Core Module
- **Purpose**: Contains singleton services, guards, and interceptors
- **Rule**: Should be imported only once in the app module
- **Contents**: 
  - Authentication services
  - HTTP interceptors for auth tokens, error handling
  - Route guards for protection
  - Core business models

### 2. Shared Module
- **Purpose**: Contains reusable components, pipes, and directives
- **Rule**: Can be imported by any feature module
- **Contents**:
  - UI components (buttons, modals, forms)
  - Utility services
  - Common pipes and directives
  - Shared models

### 3. Feature Modules (Admin)
- **Purpose**: Contains feature-specific components and services
- **Rule**: Should be lazy-loaded when possible
- **Structure**:
  - `components/`: Feature-specific components
  - `pages/`: Smart components that represent pages/routes
  - `services/`: Feature-specific services
  - `models/`: Feature-specific data models
  - `guards/`: Feature-specific route guards

## Admin Module Structure

### Pages Directory
Each page represents a route and contains:
- **List Components**: Display data in tables/cards with filtering and pagination
- **Detail Components**: Show/edit individual records
- **Form Components**: Create/update functionality

### Components Directory
- **Layout Components**: Admin layout, sidebar, header
- **Shared Components**: Admin-specific reusable components (tables, cards, stats)

### Services Directory
- Data services for CRUD operations
- State management services
- Utility services specific to admin functionality

### Models Directory
- TypeScript interfaces and types
- Data transfer objects (DTOs)
- Validation schemas

### Guards Directory
- Admin role verification
- Feature-specific permissions
- Data loading guards

## Naming Conventions

### Files
- Components: `kebab-case.component.ts`
- Services: `kebab-case.service.ts`
- Models: `kebab-case.model.ts`
- Guards: `kebab-case.guard.ts`

### Classes
- Components: `PascalCaseComponent`
- Services: `PascalCaseService`
- Models: `PascalCase` (interfaces/types)
- Guards: `PascalCaseGuard`

### Directories
- Use `kebab-case` for all directory names
- Group related files in subdirectories
- Keep directory structure flat when possible

## Best Practices

1. **Lazy Loading**: Load feature modules only when needed
2. **Single Responsibility**: Each component/service has one clear purpose
3. **Dependency Injection**: Use Angular's DI system properly
4. **Type Safety**: Use TypeScript interfaces for all data models
5. **Error Handling**: Implement proper error handling in services
6. **Documentation**: Add JSDoc comments to all public methods
7. **Testing**: Include unit tests for all components and services

## Example Usage

### Creating a New Admin Page
1. Create component in `features/admin/pages/[feature-name]/`
2. Add route to `admin-routing.module.ts`
3. Create service in `features/admin/services/`
4. Define models in `features/admin/models/`
5. Add navigation link to sidebar component

### Creating Shared Components
1. Add component to `shared/components/`
2. Export from `shared.module.ts`
3. Import `SharedModule` in feature modules that need it

This structure promotes maintainability, scalability, and follows Angular's recommended patterns for enterprise applications.
