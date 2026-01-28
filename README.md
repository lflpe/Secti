# Secti

Frontend application for SECTI (Secretaria de Ciência, Tecnologia e Inovação) built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Vite** - Fast development and optimized production builds
- ⚛️ **React 19** - Latest React with TypeScript support
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🔐 **JWT Authentication** - Secure authentication with token storage
- 🛣️ **React Router** - Client-side routing with public/private route separation
- 🔒 **Route Guards** - Protected routes accessible only to authenticated users
- 📱 **Responsive Design** - Mobile-first responsive layouts
- 🏗️ **Clean Architecture** - Well-organized project structure with reusable components

## Project Structure

```
src/
├── contexts/          # React contexts (AuthContext)
├── services/          # API services (authService)
├── guards/            # Route guards (PrivateRoute, PublicRoute)
├── layouts/           # Reusable layouts (PublicLayout, PrivateLayout)
├── pages/
│   ├── public/        # Public pages (Home, About, Login, NotFound)
│   └── private/       # Protected pages (Dashboard, Settings)
├── components/        # Reusable components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lflpe/Secti.git
cd Secti
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Authentication

The application includes a complete JWT authentication system:

### Login
- Navigate to `/login`
- Enter any email and password (demo mode)
- Upon successful login, you'll be redirected to `/dashboard`

### Logout
- Click the "Logout" button in the navigation bar
- You'll be redirected to `/login`

### Protected Routes
- `/dashboard` - Main admin dashboard (requires authentication)
- `/settings` - User settings page (requires authentication)

### Public Routes
- `/` - Home page (public)
- `/about` - About page (public)
- `/login` - Login page (redirects to dashboard if already authenticated)

## Authentication Flow

1. **Login Process:**
   - User submits credentials via the login form
   - `authService.login()` sends credentials to the backend (currently mocked)
   - Backend returns a JWT token and user data
   - Token is stored in `localStorage`
   - User is redirected to the dashboard

2. **Token Storage:**
   - JWT token is stored in `localStorage` with key `auth_token`
   - User data is stored in `localStorage` with key `auth_user`

3. **Protected Routes:**
   - Routes wrapped with `<PrivateRoute>` check for authentication
   - If not authenticated, user is redirected to `/login`
   - If authenticated, the requested page is rendered

4. **Logout Process:**
   - Token and user data are removed from `localStorage`
   - User is redirected to the login page

## API Integration

The application is ready for backend API integration. To connect to your API:

1. Update environment variables in `.env`:
```env
VITE_API_URL=https://your-api-url.com/api
VITE_AUTH_URL=https://your-api-url.com/auth
```

2. Update `src/services/authService.ts` to make real API calls:
```typescript
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  
  return await response.json();
}
```

3. Add token to API requests:
```typescript
const token = authService.getToken();
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## Technologies Used

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **ESLint** - Code linting

## Security Considerations

This demo application uses localStorage for JWT token storage for simplicity. In a production environment, consider the following security improvements:

1. **Token Storage**: Use httpOnly cookies instead of localStorage to prevent XSS attacks
2. **Token Validation**: Implement proper JWT signature verification and expiration checking
3. **HTTPS**: Always use HTTPS in production to prevent man-in-the-middle attacks
4. **CSRF Protection**: Implement CSRF tokens for state-changing operations
5. **Input Validation**: Add proper input sanitization and validation
6. **Content Security Policy**: Implement CSP headers to prevent XSS attacks

## Contributing

This is a project for SECTI. Please follow the existing code structure and conventions when contributing.

## License

This project is for institutional use by SECTI.
