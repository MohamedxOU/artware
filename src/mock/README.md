# Mock Data for Development

This folder contains mock data for testing the application without a backend server.

## Test Accounts

Use these credentials to login and access the dashboard:

### Admin Account
- **Email:** `admin@artware.com`
- **Password:** `admin123`
- **Role:** Administrator
- **Features:** Full access to all sections

### Member Accounts

#### Test User
- **Email:** `test@test.com`
- **Password:** `test123`
- **Role:** Member

#### John Doe
- **Email:** `john.doe@student.com`
- **Password:** `password123`
- **Role:** Member

#### Marie Martin
- **Email:** `marie.martin@student.com`
- **Password:** `marie2024`
- **Role:** Member

## Mock Data Includes

### User Data (`users.js`)
- User profiles with avatars, skills, contact info
- Authentication simulation
- User roles and permissions

### Dashboard Data (`dashboard.js`)
- Statistics and metrics
- Recent activities feed
- Upcoming events
- Project information
- Notifications

## Usage

The application automatically uses mock data in development mode. The auth store has been configured to:

1. **Login:** Authenticate against mock user database
2. **Sessions:** Store mock JWT tokens in localStorage
3. **Auth Check:** Validate sessions using mock tokens
4. **Logout:** Clear mock session data

## Switching to Real API

To use real API endpoints instead of mock data, set `USE_MOCK_DATA = false` in `src/stores/authStore.js`.

## Features Available

With mock data enabled, you can:
- ✅ Login with test credentials
- ✅ Access protected dashboard routes
- ✅ Navigate between dashboard sections
- ✅ View user profile and stats
- ✅ Test theme switching
- ✅ Test logout functionality
- ✅ View mock activity feeds and notifications