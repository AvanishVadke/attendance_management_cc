# Technical Specifications & API Documentation

## 📡 API Endpoints

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

---

## 🎓 Students API

### GET `/api/students`
Retrieve all students with optional filtering

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `year` | string | No | Filter by academic year |
| `division` | string | No | Filter by division |

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid_example",
      "name": "John Doe",
      "year": "2024",
      "division": "A",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST `/api/students`
Create a new student

#### Request Body
```json
{
  "name": "Jane Smith",
  "year": "2024",
  "division": "B"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "new_student_id",
    "name": "Jane Smith",
    "year": "2024",
    "division": "B",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT `/api/students`
Update an existing student

#### Request Body
```json
{
  "id": "student_id",
  "name": "Updated Name",
  "year": "2025",
  "division": "C"
}
```

### DELETE `/api/students`
Delete a student

#### Request Body
```json
{
  "id": "student_id"
}
```

---

## 📊 Attendance API

### GET `/api/attendance`
Retrieve attendance records

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `month` | number | Yes | Month (1-12) |
| `year` | number | Yes | Year (e.g., 2024) |

#### Response
```json
{
  "success": true,
  "data": [
    {
      "studentId": "student_id",
      "name": "John Doe",
      "year": "2024",
      "division": "A",
      "attendance": [
        {
          "date": "2024-01-01",
          "present": true
        }
      ]
    }
  ]
}
```

### POST `/api/attendance`
Mark attendance for multiple students

#### Request Body
```json
{
  "date": "2024-01-15",
  "attendanceData": [
    {
      "studentId": "student_id_1",
      "present": true
    },
    {
      "studentId": "student_id_2",
      "present": false
    }
  ]
}
```

---

## 📈 Dashboard API

### GET `/api/dashboard`
Get dashboard analytics data

#### Response
```json
{
  "success": true,
  "data": {
    "totalStudents": 150,
    "presentToday": 140,
    "absentToday": 10,
    "attendanceRate": 93.3,
    "monthlyStats": [
      {
        "month": "January",
        "present": 2800,
        "absent": 200
      }
    ],
    "yearlyComparison": [
      {
        "year": "2023",
        "rate": 89.5
      },
      {
        "year": "2024",
        "rate": 92.1
      }
    ]
  }
}
```

---

## 🗃️ Database Schema Details

### Students Table
```sql
CREATE TABLE "Students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Indexes
CREATE INDEX "Students_year_division_idx" ON "Students"("year", "division");
CREATE INDEX "Students_name_idx" ON "Students"("name");
```

### Attendance Table
```sql
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "present" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE CASCADE
);

-- Indexes
CREATE UNIQUE INDEX "Attendance_studentId_date_key" ON "Attendance"("studentId", "date");
CREATE INDEX "Attendance_date_idx" ON "Attendance"("date");
CREATE INDEX "Attendance_present_idx" ON "Attendance"("present");
```

---

## 🧩 Component API Reference

### AttendanceGrid Component

#### Props Interface
```typescript
interface AttendanceGridProps {
  attendanceList: AttendanceRecord[];
  selectedMonth: number;
  selectedYear: number;
  onMarkAttendance?: (data: AttendanceData[]) => void;
}

interface AttendanceRecord {
  studentId: string;
  name: string;
  year: string;
  division: string;
  attendance: DayAttendance[];
}

interface DayAttendance {
  date: string;
  present: boolean;
}
```

#### Usage Example
```jsx
<AttendanceGrid
  attendanceList={attendanceData}
  selectedMonth={currentMonth}
  selectedYear={currentYear}
  onMarkAttendance={handleAttendanceSubmit}
/>
```

### StudentListTable Component

#### Props Interface
```typescript
interface StudentListTableProps {
  studentList: Student[];
  refreshData: () => void;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (studentId: string) => void;
}

interface Student {
  id: string;
  name: string;
  year: string;
  division: string;
  createdAt: string;
  updatedAt: string;
}
```

### SideNav Component

#### Props Interface
```typescript
interface SideNavProps {
  className?: string;
}
```

#### Internal State
```typescript
interface SideNavState {
  isOpen: boolean;
  activeRoute: string;
}
```

---

## 🎨 Styling Conventions

### Tailwind CSS Patterns

#### Layout Classes
```css
/* Container patterns */
.container-full     → w-full max-w-none
.container-content  → max-w-6xl mx-auto px-4 md:px-6
.container-section  → py-16 md:py-24

/* Grid patterns */
.grid-responsive    → grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
.grid-cards        → grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6

/* Spacing patterns */
.spacing-section   → p-4 md:p-6 lg:p-8
.spacing-card      → p-6 md:p-8
.spacing-compact   → p-2 md:p-3
```

#### Component Classes
```css
/* Button variants */
.btn-primary       → bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white
.btn-secondary     → bg-white/10 border-blue-500/30 text-white hover:bg-blue-500/20
.btn-ghost         → bg-transparent hover:bg-white/10 text-white

/* Card variants */
.card-primary      → bg-white/5 backdrop-blur-sm rounded-xl border border-white/10
.card-feature      → bg-white/5 backdrop-blur-sm rounded-xl border hover:bg-white/10 transition-all duration-300
.card-glow         → shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40
```

#### Animation Classes
```css
/* Custom animations */
.animate-breathe   → animation: breathe 4s ease-in-out infinite
.animate-glow      → animation: glow 2s ease-in-out infinite alternate
.animate-float     → animation: float 3s ease-in-out infinite

/* Transition patterns */
.transition-smooth → transition-all duration-300 ease-in-out
.transition-fast   → transition-all duration-200 ease-in-out
.transition-slow   → transition-all duration-500 ease-in-out
```

---

## 🔧 Build & Deployment Configuration

### Next.js Configuration (`next.config.mjs`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true,
  },
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
```

### Tailwind Configuration (`tailwind.config.js`)
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          emerald: '#10b981',
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.2)', opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🛡️ Security Considerations

### Authentication Security
- Clerk handles secure authentication flow
- JWT tokens automatically managed
- Session management built-in
- CSRF protection enabled by default

### API Security
```javascript
// Middleware protection example
export async function middleware(req) {
  const { auth } = await import('@clerk/nextjs/server');
  
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  return NextResponse.next();
}
```

### Environment Variables
```bash
# Required for security
CLERK_SECRET_KEY=         # Server-side secret
DATABASE_URL=             # Database connection (use connection pooling)
NEXTAUTH_SECRET=          # Additional security if needed

# Optional but recommended
ALLOWED_ORIGINS=          # CORS configuration
RATE_LIMIT_MAX=          # API rate limiting
```

---

## 📊 Performance Optimization

### Code Splitting
```javascript
// Dynamic imports for large components
const AttendanceGrid = dynamic(() => import('./AttendanceGrid'), {
  loading: () => <GridSkeleton />,
  ssr: false
});

// Route-based splitting (automatic in Next.js App Router)
```

### Image Optimization
```jsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/cc.png"
  alt="Coder's Club Logo"
  width={48}
  height={48}
  priority={true}
/>
```

### Bundle Analysis
```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## 🧪 Testing Framework Setup

### Unit Testing (Jest + React Testing Library)
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Test Example
```javascript
// __tests__/components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Testing (Playwright)
```bash
npm install --save-dev @playwright/test
```

```javascript
// tests/e2e/dashboard.spec.js
import { test, expect } from '@playwright/test';

test('dashboard navigation works', async ({ page }) => {
  await page.goto('/dashboard');
  await page.click('[data-testid="students-nav"]');
  await expect(page).toHaveURL('/dashboard/students');
});
```

---

## 📝 Error Handling Patterns

### API Error Handling
```javascript
// utils/api.js
export async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}
```

### Component Error Boundaries
```jsx
// components/ErrorBoundary.jsx
'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 🔄 State Management Patterns

### Local State (useState)
```jsx
// For component-specific state
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState(initialFormData);
```

### Global State (Context API)
```jsx
// contexts/AppContext.jsx
const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
```

### Server State (SWR/React Query)
```jsx
// For future implementation
import useSWR from 'swr';

export function useStudents() {
  const { data, error, isLoading } = useSWR('/api/students', fetcher);
  
  return {
    students: data?.data || [],
    isLoading,
    isError: error,
  };
}
```

---

*This technical documentation should be maintained alongside the main project documentation and updated as the codebase evolves.*
