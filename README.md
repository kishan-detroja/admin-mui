# Visio Admin Panel

A modern admin panel built with React, MUI 7.5.0, Redux Toolkit, and Vite.

## Features

- ✅ **Redux State Management** - Centralized state with Redux Toolkit
- ✅ **API Integration** - Axios with interceptors for authentication
- ✅ **Users Module** - Complete CRUD operations for user management
- ✅ **Form Validation** - React Hook Form with Zod schema validation
- ✅ **Error Handling** - Comprehensive error boundaries and user feedback
- ✅ **Custom Hooks** - Reusable hooks for common patterns
- ✅ **Environment Configuration** - Multi-environment support
- ✅ **MUI Components** - Material-UI 7.5.0 with custom theming
- ✅ **TypeScript Ready** - JSDoc comments for better IDE support

## Prerequisites

- Node.js >= 20
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install Redux dependencies (if not already installed):

```bash
npm install @reduxjs/toolkit react-redux
# or
yarn add @reduxjs/toolkit react-redux
```

## Environment Setup

1. Copy the environment template:

```bash
cp .env.local.example .env
```

2. Update environment variables:

```env
VITE_APP_NAME=Visio Admin
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_ENV=local
```

## Available Scripts

```bash
# Development
npm run dev              # Start development server on port 3031
npm run start            # Preview production build

# Build
npm run build            # Build for production

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run fm:check         # Check Prettier formatting
npm run fm:fix           # Fix Prettier formatting
npm run fix:all          # Fix both ESLint and Prettier

# Maintenance
npm run clean            # Remove node_modules and build files
npm run re:dev           # Clean install and start dev
npm run re:build         # Clean install and build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── error-boundary/  # Error boundary component
│   └── snackbar/        # Global notifications
├── hooks/               # Custom React hooks
├── pages/               # Page components
│   └── users/           # Users module
├── services/            # API services
│   ├── axios.js         # Axios instance
│   └── api/             # API endpoints
├── store/               # Redux store
│   └── slices/          # Redux slices
├── utils/               # Utility functions
├── routes/              # Routing configuration
├── theme/               # MUI theme configuration
└── app.jsx              # Root app component
```

## Modules

### Users Module

Complete user management system with:
- User list with pagination and search
- Create/edit user forms with validation
- User detail view
- Delete with confirmation
- Role and status management

**Access:** `/dashboard/users`

## API Integration

### Axios Configuration

The app uses a configured axios instance with:
- Automatic token injection
- Error handling interceptors
- Base URL from environment variables

### Using API Services

```javascript
import { usersApi } from 'src/services/api';

// Fetch users
const users = await usersApi.getUsers({ page: 1, limit: 10 });

// Create user
const newUser = await usersApi.createUser(userData);
```

### Using Redux

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from 'src/store/slices/usersSlice';

const dispatch = useDispatch();
const users = useSelector(selectUsers);

dispatch(fetchUsers({ page: 1, limit: 10 }));
```

## Utilities

### Helpers
- Date/currency/number formatting
- Text manipulation
- Debounce function
- Deep clone and object utilities

### Validators
- Email, phone, URL validation
- Password strength checker
- Form field validators

### Error Handling
- API error handler
- Error logging
- Validation error extraction

### Constants
- API status codes
- User roles and statuses
- Pagination defaults
- Storage keys

## Custom Hooks

- **useDebounce** - Debounce input values
- **useAsync** - Manage async operations
- **useLocalStorage** - Sync state with localStorage

## Environment Files

Create these files from templates:
- `.env` - Local development (from `.env.local.example`)
- `.env.dev` - Development server (from `.env.dev.example`)
- `.env.stage` - Staging server (from `.env.stage.example`)
- `.env.production` - Production server (from `.env.production.example`)

## Theme

The app uses MUI 7.5.0 with a custom theme. Theme configuration is in `src/theme/`.

## Contributing

1. Follow the existing code style
2. Run linting before committing: `npm run fix:all`
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

Private - Visio Project

## Support

For issues or questions, please contact the development team.
