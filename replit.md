# DD_TryBeforeBy - Raiffeisen Bank Procurement System

## Overview

DD_TryBeforeBy is a comprehensive procurement management system designed for Raiffeisen Bank, featuring supplier management, agreement tracking, auction processing, and user administration. The application provides enterprise-grade functionality for managing procurement workflows, early payment agreements, and supplier relationships within a banking environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **UI Components**: Hybrid approach using shadcn/ui components built on Radix UI primitives alongside Vienna UI components for enterprise consistency
- **Styling**: Tailwind CSS with custom design system implementing Raiffeisen Bank's brand colors (primary yellow accent) and ViennaUI design patterns
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for end-to-end type safety
- **API Pattern**: RESTful API structure with modular route registration
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) that can be easily swapped for database implementations

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle ORM with Zod schema validation for type-safe database operations
- **Connection**: Neon serverless PostgreSQL for scalable cloud database hosting
- **Migrations**: Drizzle Kit for database schema management and migrations

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Schema**: Basic user model with username/password authentication
- **Frontend Auth**: Simple authentication state management with login/logout flows

### Development and Deployment
- **Development**: Hot reload with Vite dev server and Express middleware integration
- **Build Process**: Separate client (Vite) and server (esbuild) build pipelines
- **Environment**: Replit-optimized with development banner and cartographer integration
- **Error Handling**: Runtime error overlay for development debugging

## External Dependencies

### UI and Design System
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/react-*)
- **Vienna UI**: Enterprise design system components for banking applications
- **Lucide React**: Modern icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

### Database and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM with automatic TypeScript inference
- **drizzle-zod**: Schema validation integration between Drizzle and Zod

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **esbuild**: Fast JavaScript/TypeScript bundler for server builds

### Utilities and Validation
- **zod**: Runtime type validation and schema definition
- **class-variance-authority**: Type-safe variant styling for components
- **clsx**: Conditional CSS class name utility
- **date-fns**: Modern date manipulation library for handling procurement dates and scheduling