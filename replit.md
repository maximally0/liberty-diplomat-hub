# ProjectLiberty - Global Model United Nations Platform

## Overview

ProjectLiberty is a comprehensive web platform for discovering, hosting, and participating in Model United Nations (MUN) conferences worldwide. The application connects delegates, organizers, and institutions through features including event browsing, registration management, country assignments, certificate management, position paper submissions, announcements, leaderboards, and educational resources.

The platform serves as a central hub for the global MUN community, enabling users to find conferences, track their participation history, earn achievements, and access learning materials—all in one place.

## Recent Changes (November 9, 2025)

**Migration from Lovable to Replit Completed:**
- Restructured project from Lovable format to Replit fullstack template
- Created proper directory structure: `client/`, `server/`, and `shared/`
- Set up Express.js backend with Vite middleware for development
- Configured production static file serving
- Updated package.json with dev, build, and start scripts
- Fixed tsx watch restart loop with --ignore flag
- Verified application runs successfully on port 5000

**Registration Flow Implementation Completed:**
- Created comprehensive mock data files (events, committees, users, registrations, countries, institutions, promo codes)
- Built ProfileCaptureModal component with form validation using react-hook-form and zod schemas
- Implemented multi-step RegistrationWizard with 5-step flow:
  - Step 1: Profile confirmation
  - Step 2: Committee selection with capacity display and country preference ranking
  - Step 3: Portfolio upload with position paper file upload and committee pitch text
  - Step 4: Payment options (Pay Now, Pay Later with 72-hour hold, Invoice request)
  - Step 5: Final review before submission
- Created SuccessScreen component for post-registration confirmation
- Built RegistrationContext for centralized state management with localStorage persistence
- Integrated registration flow into MUNEvent page with duplicate prevention
- Registration status display shows payment status and hold expiry

**Dashboard Implementation Completed:**
- Created role-aware Dashboard page with tabs for delegate and organizer views
- Built DelegateDashboard component with:
  - Registrations grouped by status (Confirmed, Pending Payment, Invoice Requested, Waitlisted, Rejected, Withdrawn)
  - Color-coded status cards with event details, committee, payment tracking
  - Context-aware action buttons (Complete Payment, Upload Paper, Withdraw)
  - Empty state with call-to-action to browse events
- Built OrganizerConsole component with:
  - Filterable table view (All, Pending Review, Confirmed, Waitlist)
  - Delegate information, event details, payment status, country assignments
  - Dropdown actions per registration (Approve, Reject with reason, Send Reminder, Assign Country)
  - Modal dialogs for rejection reasons and country assignment
  - Toast notifications for all actions
- Implemented RegistrationContext (React Context API) for synchronized state across all components
- Real-time state updates: organizer actions immediately reflect in delegate view without page refresh
- All mutations persist to localStorage for data persistence

**Project Structure:**
- `client/` - Frontend React application
- `server/` - Express.js backend server
- `shared/` - Shared TypeScript schemas and types
- `client/src/data/` - Mock JSON data files for events, committees, users, registrations
- `client/src/components/registration/` - Registration flow components
- `client/src/components/dashboard/` - Dashboard components (DelegateDashboard, OrganizerConsole)
- `client/src/contexts/` - React Context providers for global state management

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool.

**Routing**: React Router v6 for client-side navigation with dedicated routes for:
- Home/landing page (`/`)
- Conference browsing (`/browse`)
- Individual MUN event pages (`/mun/:id`)
- User dashboard (`/dashboard`)
- Global leaderboard (`/leaderboard`)
- Educational resources (`/resources`)
- Authentication (`/auth`)
- 404 fallback (`*`)

**UI Component System**: Radix UI primitives with shadcn/ui styling pattern, providing accessible, customizable components. All components follow a consistent design system defined in CSS variables using HSL color format.

**Styling**: Tailwind CSS with custom configuration including:
- Custom color palette (liberty-blue, liberty-gold)
- CSS custom properties for theming
- Dark mode support via class-based theme switching
- Custom fonts (Inter, Outfit)

**State Management**: 
- TanStack Query (React Query) v5 for server state management and data fetching
- React Context API for registration state (RegistrationContext) with localStorage persistence
- React hooks for local component state
- Centralized state management ensures real-time synchronization across delegate and organizer views

**Key Design Patterns**:
- Compound component pattern for complex UI elements
- Component composition using Radix UI Slot for flexible APIs
- Mock data pattern for development (all data currently stored in `mockData.ts`)
- Responsive design with mobile-first approach

### Backend Architecture

**Server Framework**: Express.js v5 running on Node.js with TypeScript.

**Development Server**: Custom Vite middleware integration for hot module replacement during development.

**Production Serving**: Static file serving of the built React application from `dist/public` directory.

**API Structure**: RESTful API pattern with routes registered via `registerRoutes` function. Currently minimal with placeholder storage implementation.

**Storage Layer**: Interface-based storage pattern (`IStorage`) with in-memory implementation (`MemStorage`). This abstraction allows future replacement with database-backed storage without changing API contracts.

**Middleware**: 
- JSON and URL-encoded body parsing
- Request logging with timing and response capture
- Static file serving in production

**Rationale**: The Express server provides a thin backend layer that can be extended with database integration and business logic as needed. The storage interface pattern ensures clean separation of concerns and testability.

### Data Storage Solutions

**Current State**: Mock data stored in client-side TypeScript files (`client/src/lib/mockData.ts`).

**Data Models**:
- MUN events (conferences, committees, chairs)
- Delegates (users, registrations, status)
- Countries/assignments
- Certificates and awards
- Badges and achievements
- Position papers
- Announcements and notifications
- Leaderboard entries

**Future Database Integration**: The codebase is structured to accommodate database integration through:
- The `IStorage` interface on the backend
- Zod schemas in `shared/schema.ts` for runtime type validation
- TanStack Query hooks ready for API integration

**Rationale**: Starting with mock data enables rapid frontend development and prototyping. The schema-first approach using Zod ensures type safety when migrating to a real database.

### Authentication and Authorization

**Current State**: Mock authentication state (hardcoded `isSignedIn = false` in Navigation component).

**Auth Flow Design**: 
- Dedicated `/auth` route with sign-in/sign-up tabs
- Form-based authentication UI with role selection (Delegate, Organizer, Institution Admin)
- Success/error handling via toast notifications
- Post-auth redirect to dashboard

**Authorization Pattern**: Role-based access control with three user types:
- Delegates (participate in conferences)
- Organizers (host and manage MUN events)
- Institution Admins (manage school/organization participation)

**Future Integration**: The authentication flow is designed to integrate with services like Clerk, Auth0, or custom JWT-based authentication.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (accordion, dialog, dropdown, tabs, toast, etc.)
- **shadcn/ui**: Pre-styled component patterns built on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Styling and Design
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant generation for components
- **clsx** & **tailwind-merge**: Utility for conditional className merging

### Forms and Validation
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Validation schema integration
- **Zod**: TypeScript-first schema validation (used in shared schemas)

### Data Fetching
- **TanStack Query**: Async state management and data synchronization
- Custom `apiRequest` utility wrapper for fetch API calls

### Carousel and Interactive Elements
- **Embla Carousel React**: Touch-friendly carousel/slider component
- **cmdk**: Command palette/search component
- **input-otp**: OTP input component

### Date Handling
- **date-fns**: Date utility library for formatting and manipulation

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **ESLint**: Code linting with React-specific rules
- **tsx**: TypeScript execution for the server

### Theming
- **next-themes**: Theme management (light/dark mode support)

### Third-Party Services (Planned Integration)
- Authentication provider (not yet integrated)
- Email service for notifications
- File storage for certificates and documents
- Payment processing for paid conferences

**Note**: The application currently operates entirely with mock data and local state. All external service integrations are planned for future implementation, with the architecture designed to accommodate these additions without major refactoring.