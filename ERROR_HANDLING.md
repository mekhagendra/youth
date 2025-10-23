# Error Handling System

This application includes a comprehensive error handling system with custom error pages for different HTTP status codes.

## Error Pages Available

### 404 - Page Not Found
- **Route**: Any undefined route automatically triggers this error
- **Component**: `resources/js/pages/Errors/404.tsx`
- **Blade View**: `resources/views/errors/404.blade.php`
- **Message**: "The page you're looking for seems to have vanished into thin air!"

### 403 - Access Forbidden
- **Trigger**: When user tries to access restricted areas without permission
- **Component**: `resources/js/pages/Errors/403.tsx`
- **Blade View**: `resources/views/errors/403.blade.php`
- **Message**: "You don't have permission to access this area."

### 500 - Server Error
- **Trigger**: Internal server errors in production environment
- **Component**: `resources/js/pages/Errors/500.tsx`
- **Blade View**: `resources/views/errors/500.blade.php`
- **Message**: "Something went wrong on our end. We're working to fix it!"

### 503 - Service Unavailable
- **Trigger**: During maintenance or when services are unavailable
- **Component**: `resources/js/pages/Errors/503.tsx`
- **Blade View**: `resources/views/errors/503.blade.php`
- **Message**: "We're currently performing maintenance. Please check back in a few minutes!"

## Error Page Features

### Universal ErrorPage Component
Located at `resources/js/pages/Errors/ErrorPage.tsx`, this component provides:

- **Dynamic Content**: Different messages and suggestions based on status codes
- **Animated Icons**: Status-specific animated icons using Lucide React
- **Interactive Elements**: 
  - "Go Home" button with smooth navigation
  - "Go Back" button with browser history
  - "Try Again" button for refreshing the page
- **Responsive Design**: Works on all device sizes
- **Creative Messaging**: User-friendly error descriptions instead of technical jargon

### Design Elements
- **Modern UI**: Clean, professional design with proper spacing
- **Color-coded**: Different accent colors for different error types
- **Glassmorphism**: Subtle background effects and modern card design
- **Animations**: Smooth transitions and hover effects
- **Typography**: Clear hierarchy with proper font weights

## Testing Error Pages (Development Only)

In development environment, you can test different error pages using these routes:

```
http://localhost:8001/test-errors/404  - Test 404 Not Found
http://localhost:8001/test-errors/403  - Test 403 Forbidden
http://localhost:8001/test-errors/500  - Test 500 Server Error
http://localhost:8001/test-errors/503  - Test 503 Service Unavailable
```

## Implementation Details

### Exception Handling
The error handling is configured in `bootstrap/app.php` with custom exception renderers for:
- `NotFoundHttpException` → 404 error page
- `AccessDeniedHttpException` → 403 error page
- `ServiceUnavailableHttpException` → 503 error page
- General `Throwable` → 500 error page (production only)

### Fallback Route
A fallback route in `routes/web.php` catches any undefined routes and displays the 404 error page.

### JSON API Responses
When requests expect JSON responses (API calls), appropriate JSON error messages are returned instead of HTML error pages.

## File Structure

```
resources/
├── js/pages/Errors/
│   ├── ErrorPage.tsx     # Universal error component
│   ├── 404.tsx           # 404 Not Found
│   ├── 403.tsx           # 403 Forbidden
│   ├── 500.tsx           # 500 Server Error
│   └── 503.tsx           # 503 Service Unavailable
└── views/errors/
    ├── 404.blade.php     # Laravel 404 view
    ├── 403.blade.php     # Laravel 403 view
    ├── 500.blade.php     # Laravel 500 view
    └── 503.blade.php     # Laravel 503 view
```

## Customization

To add new error pages:
1. Create a new React component in `resources/js/pages/Errors/`
2. Create corresponding Blade view in `resources/views/errors/`
3. Add exception handler in `bootstrap/app.php` if needed
4. Update this documentation

## User Experience

The error pages are designed to:
- Provide clear, non-technical explanations
- Offer helpful suggestions and actions
- Maintain the application's branding and style
- Guide users back to working parts of the application
- Create a positive experience even when things go wrong