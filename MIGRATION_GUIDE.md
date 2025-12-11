# Developer Migration Guide: Role → User Type System

## Quick Reference

### Old → New Field Names
```php
// OLD
$user->role  // 'admin', 'member', 'user'

// NEW
$user->user_type  // 'System Admin', 'System Manager', 'Member', etc.
$user->status     // 'Active', 'Pending', 'Inactive', 'Rejected'
$user->is_active  // boolean
```

### Old → New Methods

#### Authentication Checks
```php
// OLD
$user->isAdmin()   // role === 'admin'
$user->isMember()  // role === 'member'  
$user->isUser()    // role === 'user'

// NEW  
$user->isAdmin()            // System Admin OR System Manager
$user->isSystemAdmin()      // System Admin only
$user->isSystemManager()    // System Manager only
$user->isMember()           // Member only
$user->isVolunteer()        // Volunteer only
$user->isIntern()           // Intern only
$user->isEmployee()         // Employee only
$user->isGuest()            // Guest only
```

#### Permission Checks
```php
// OLD
$user->canManageContent()  // isAdmin() || isMember()

// NEW
$user->canManageContent()          // Admin OR Member OR Employee
$user->canAccessAdminDashboard()   // Admin only
$user->canApproveApplications()    // Admin only
$user->canManageUsers()            // Admin only
$user->canModifySystemSettings()   // System Admin only
$user->canApplyForMembership()     // Guest with Active status
```

### Frontend Type Updates

```typescript
// OLD
interface User {
  role: string; // 'admin', 'member', 'user'
}

// NEW
type UserType = 'Guest' | 'Member' | 'Volunteer' | 'Intern' | 'Employee' | 'System Admin' | 'System Manager';
type UserStatus = 'Pending' | 'Active' | 'Inactive' | 'Rejected';

interface User {
  user_type: UserType;
  status: UserStatus;
  is_active: boolean;
  role?: string; // Deprecated - for backward compatibility
}
```

### Route Middleware

```php
// OLD - Still works with backward compatibility!
Route::middleware('role:admin')->group(function () {
    // Admin routes
});

Route::middleware('role:member,admin')->group(function () {
    // Member and admin routes
});

// NEW - Preferred for new code
Route::middleware('role:System Admin,System Manager')->group(function () {
    // Admin routes (more explicit)
});

Route::middleware('role:Member,Volunteer,Intern,Employee')->group(function () {
    // All membership types
});
```

## Common Migration Patterns

### Pattern 1: Simple Role Check
```php
// BEFORE
if ($user->role === 'admin') {
    // Do admin stuff
}

// AFTER
if ($user->isAdmin()) {
    // Do admin stuff
}
```

### Pattern 2: Multiple Role Check
```php
// BEFORE
if (in_array($user->role, ['admin', 'member'])) {
    // Do stuff
}

// AFTER
if ($user->isAdmin() || $user->isMember()) {
    // Do stuff
}
```

### Pattern 3: Frontend Conditional
```tsx
// BEFORE
{user.role === 'admin' && (
  <AdminPanel />
)}

// AFTER
{(user.user_type === 'System Admin' || user.user_type === 'System Manager') && (
  <AdminPanel />
)}

// BETTER - Add helper in frontend
const isAdmin = (user: User) => 
  ['System Admin', 'System Manager'].includes(user.user_type);

{isAdmin(user) && <AdminPanel />}
```

### Pattern 4: Blade Templates
```blade
{{-- BEFORE --}}
@if(Auth::user()->role === 'admin')
    <div>Admin Content</div>
@endif

{{-- AFTER --}}
@if(Auth::user()->isAdmin())
    <div>Admin Content</div>
@endif
```

## Database Queries

### Eloquent
```php
// BEFORE
$admins = User::where('role', 'admin')->get();
$members = User::where('role', 'member')->get();

// AFTER
$admins = User::whereIn('user_type', ['System Admin', 'System Manager'])->get();
$members = User::where('user_type', 'Member')->get();
$allMembership = User::whereIn('user_type', ['Member', 'Volunteer', 'Intern', 'Employee'])->get();
```

### Query Builder
```php
// BEFORE
DB::table('users')->where('role', 'admin')->count();

// AFTER
DB::table('users')
  ->whereIn('user_type', ['System Admin', 'System Manager'])
  ->count();
```

## Scopes (Recommended Addition)

Add these to User model for cleaner queries:

```php
// In User.php
public function scopeAdmins($query)
{
    return $query->whereIn('user_type', ['System Admin', 'System Manager']);
}

public function scopeMembers($query)
{
    return $query->where('user_type', 'Member');
}

public function scopeWithMembership($query)
{
    return $query->whereIn('user_type', ['Member', 'Volunteer', 'Intern', 'Employee']);
}

public function scopeActive($query)
{
    return $query->where('status', 'Active')->where('is_active', true);
}

// Usage
$admins = User::admins()->get();
$activeMembers = User::members()->active()->get();
```

## Breaking Changes

### ⚠️ Direct role Column Access
```php
// WILL BREAK - Column doesn't exist anymore
$user->role  // NULL or error

// FIX - Use accessor (temporary compatibility)
$user->getRoleAttribute()  // Returns mapped value

// BETTER - Update to new system
$user->user_type
```

### ⚠️ Database Seeders/Factories
```php
// BEFORE
User::factory()->create([
    'role' => 'admin',
]);

// AFTER
User::factory()->create([
    'user_type' => 'System Admin',
    'status' => 'Active',
    'is_active' => true,
]);
```

### ⚠️ Form Requests/Validation
```php
// BEFORE
'role' => 'required|in:admin,member,user',

// AFTER
'user_type' => 'required|in:Guest,Member,Volunteer,Intern,Employee,System Admin,System Manager',
'status' => 'required|in:Pending,Active,Inactive,Rejected',
```

## Testing Updates

```php
// BEFORE
$user = User::factory()->create(['role' => 'admin']);
$this->assertTrue($user->isAdmin());

// AFTER
$user = User::factory()->create([
    'user_type' => 'System Admin',
    'status' => 'Active',
    'is_active' => true,
]);
$this->assertTrue($user->isAdmin());
$this->assertTrue($user->isSystemAdmin());
```

## Search & Replace Checklist

Use these patterns to find code that needs updating:

### Backend (PHP)
- [ ] `->role` or `['role']` - Direct role column access
- [ ] `role ===` or `role ==` - Role comparisons
- [ ] `'role'` in validation rules
- [ ] `role` in Blade templates
- [ ] `role` in query builders

### Frontend (TypeScript/React)
- [ ] `user.role` - Property access
- [ ] `role:` in type definitions
- [ ] Role-based conditionals in JSX
- [ ] Role checks in navigation components

### Routes
- [ ] `role:admin` middleware usage (works but update for clarity)
- [ ] Role-based route groups

## Backward Compatibility Notes

The system maintains compatibility through:

1. **getRoleAttribute()** - Allows `$user->role` to still work (returns mapped value)
2. **CheckRole Middleware** - Accepts both old role names and new user_types
3. **Existing Routes** - Continue to work without changes

However, relying on backward compatibility is not recommended for new code.

## Recommended Order for Migration

1. ✅ Update backend models and methods (DONE)
2. ✅ Update middleware (DONE)  
3. ✅ Update database seeders/factories (DONE)
4. ⏳ Update controllers to use new methods
5. ⏳ Update Blade templates (if any)
6. ⏳ Update frontend components
7. ⏳ Update tests
8. ⏳ Remove backward compatibility code (future)

## Need Help?

- See UNIFIED_USER_SYSTEM.md for system overview
- See IMPLEMENTATION_SUMMARY.md for what's been completed
- Check User model for all available methods
- Review UserApplication model for application workflow
