# Job Portal - AI Coding Guidelines

## Architecture Overview
This is a React-based job portal application bootstrapped with Create React App. The app features user authentication, role-based access (admin/user), and core features like CV building, internship listings, and company profiles.

### Key Components
- **Pages** (`src/pages/`): Route-based components (Home, Login, Register, Dashboard, AdminPanel, etc.)
- **Components** (`src/components/`): Reusable UI elements (Navbar, Footer, ProtectedRoute)
- **Context** (`src/context/`): Global state management, primarily AuthContext for authentication
- **Services** (`src/services/`): API integration layer (api.js for backend communication)

### Data Flow
- Authentication state managed via React Context in `AuthContext.jsx`
- API calls centralized in `services/api.js`
- Protected routes use `ProtectedRoute.jsx` component for access control

## Developer Workflows
- **Development**: `npm start` runs the app on http://localhost:3000 with hot reload
- **Testing**: `npm test` launches Jest in watch mode
- **Build**: `npm run build` creates production build in `build/` folder
- **Linting**: ESLint configured via react-app preset

## Code Patterns
- Use JSX for all React components (.jsx extension)
- Organize imports: React first, then third-party, then local
- Authentication checks: Wrap sensitive components with `<ProtectedRoute>` and pass required roles
- API calls: Import and use functions from `services/api.js` for all backend interactions
- State management: Prefer React Context for global state like auth; use local state for component-specific data

## File Structure Conventions
- Pages in `src/pages/` represent main app routes
- Shared components in `src/components/`
- Context providers in `src/context/`
- API utilities in `src/services/`

## Examples
- For a new page: Create in `src/pages/`, import in routing logic (likely in App.js)
- For API integration: Add function to `services/api.js`, e.g., `export const fetchJobs = () => axios.get('/jobs')`
- For protected content: `<ProtectedRoute roles={['admin']}><AdminPanel /></ProtectedRoute>`

## Dependencies
- React 19 with hooks
- Testing Library for unit tests
- Standard CRA setup (webpack, Babel included)</content>
<parameter name="filePath">c:\Users\DELL 7490\Desktop\job-potal\job-potal\.github\copilot-instructions.md