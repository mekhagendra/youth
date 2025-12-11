# Role-Based Access Control Implementation

## Overview
Implemented a comprehensive role-based access control system with three user roles: **admin**, **member**, and **user**.

## Database Changes

### 1. Users Table Extensions (Migration: 2025_12_11_000823)
Added columns to users table:
- `membership_number` (string, unique, nullable) - For members only
- `phone` (string, nullable)
- `address` (text, nullable)
- `date_of_birth` (date, nullable)
- `gender` (string, nullable)

### 2. Voice of Changes Table (Migration: 2025_12_11_000842)
New table for member-submitted messages:
- `user_id` (foreign key to users)
- `title` (string)
- `message` (text)
- `status` (enum: pending, approved, rejected) - default: pending
- `admin_notes` (text, nullable)
- `published_at` (timestamp, nullable)
- `timestamps`

## Models Updated

### User Model
**New Fields:**
- membership_number, phone, address, date_of_birth, gender

**New Methods:**
- `isAdmin()` - Check if user is admin
- `isMember()` - Check if user is member
- `isUser()` - Check if user is regular user
- `canManageContent()` - Check if user can manage content (admin or member)

**New Relationships:**
- `voiceOfChanges()` - Has many VoiceOfChange

### VoiceOfChange Model (New)
**Fillable Fields:**
- user_id, title, message, status, admin_notes, published_at

**Scopes:**
- `pending()` - Get pending submissions
- `approved()` - Get approved submissions
- `published()` - Get approved and published submissions
- `rejected()` - Get rejected submissions
- `recent()` - Order by created_at desc

**Relationships:**
- `user()` - Belongs to User

## Middleware

### CheckRole Middleware (New)
**Location:** `app/Http/Middleware/CheckRole.php`

**Usage:** 
```php
Route::middleware(['role:admin'])->group(function() {
    // Admin only routes
});

Route::middleware(['role:admin,member'])->group(function() {
    // Admin and member routes
});
```

**Registered in bootstrap/app.php as:** `'role' => CheckRole::class`

## Access Control Rules

### Admin Role
- **Full Access** to everything
- Can view/edit/delete all users
- Can approve/reject member submissions
- Can manage all content (activities, gallery, supporters, etc.)
- Can view volunteer and internship applications
- Can update any profile

### Member Role
- **Can update own profile** except:
  - Cannot change `name`
  - Cannot change `membership_number`
- **Can compose messages** for "Voice of Changes" section
- Messages require admin approval before publishing
- Can view own submitted messages
- Can manage own content

### User Role
- **Can only update own profile**
- Basic fields: email, password, phone, address, date_of_birth, gender
- Cannot change name
- Cannot access admin features
- Cannot submit voice of changes

## Next Steps to Complete Implementation

### 1. Update Profile Controller
Need to implement profile update logic with role-based restrictions:

```php
// In ProfileController
public function update(Request $request)
{
    $user = $request->user();
    
    // Define allowed fields based on role
    $allowedFields = ['email', 'phone', 'address', 'date_of_birth', 'gender'];
    
    if ($user->isAdmin()) {
        // Admin can update everything
        $allowedFields[] = 'name';
        $allowedFields[] = 'membership_number';
        $allowedFields[] = 'role';
    } elseif ($user->isMember()) {
        // Member cannot update name and membership_number
        // Already excluded from allowedFields
    } else {
        // Regular user - same as member
    }
    
    // Validate and update only allowed fields
    $validated = $request->validate([
        // validation rules
    ]);
    
    $user->update(array_intersect_key($validated, array_flip($allowedFields)));
}
```

### 2. Create VoiceOfChange Controllers

**Member Controller** (`VoiceOfChangeController.php`):
- `index()` - Show member's own submissions
- `create()` - Show form to create new message
- `store()` - Submit new message (status: pending)
- `show()` - View own submission details
- `edit()` - Edit pending submission
- `update()` - Update pending submission
- `destroy()` - Delete own pending submission

**Admin Controller** (`Admin/VoiceOfChangeAdminController.php`):
- `index()` - List all submissions with filtering
- `show()` - View submission details
- `updateStatus()` - Approve/reject submissions
- `destroy()` - Delete any submission
- `publish()` - Publish approved submission to homepage

### 3. Add Routes

```php
// In routes/web.php

// Voice of Changes for Members
Route::middleware(['auth', 'role:member,admin'])->group(function() {
    Route::get('/voice-of-changes', [VoiceOfChangeController::class, 'index'])->name('voice-of-changes.index');
    Route::get('/voice-of-changes/create', [VoiceOfChangeController::class, 'create'])->name('voice-of-changes.create');
    Route::post('/voice-of-changes', [VoiceOfChangeController::class, 'store'])->name('voice-of-changes.store');
    Route::get('/voice-of-changes/{voiceOfChange}', [VoiceOfChangeController::class, 'show'])->name('voice-of-changes.show');
    Route::get('/voice-of-changes/{voiceOfChange}/edit', [VoiceOfChangeController::class, 'edit'])->name('voice-of-changes.edit');
    Route::put('/voice-of-changes/{voiceOfChange}', [VoiceOfChangeController::class, 'update'])->name('voice-of-changes.update');
    Route::delete('/voice-of-changes/{voiceOfChange}', [VoiceOfChangeController::class, 'destroy'])->name('voice-of-changes.destroy');
});

// Admin Voice of Changes Management
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function() {
    Route::get('/voice-of-changes', [VoiceOfChangeAdminController::class, 'index'])->name('admin.voice-of-changes.index');
    Route::get('/voice-of-changes/{voiceOfChange}', [VoiceOfChangeAdminController::class, 'show'])->name('admin.voice-of-changes.show');
    Route::patch('/voice-of-changes/{voiceOfChange}/status', [VoiceOfChangeAdminController::class, 'updateStatus'])->name('admin.voice-of-changes.update-status');
    Route::delete('/voice-of-changes/{voiceOfChange}', [VoiceOfChangeAdminController::class, 'destroy'])->name('admin.voice-of-changes.destroy');
});
```

### 4. Create Frontend Pages

Need to create React/TypeScript pages:

**For Members:**
- `/resources/js/pages/VoiceOfChanges/Index.tsx`
- `/resources/js/pages/VoiceOfChanges/Create.tsx`
- `/resources/js/pages/VoiceOfChanges/Show.tsx`
- `/resources/js/pages/VoiceOfChanges/Edit.tsx`

**For Admin:**
- `/resources/js/pages/Admin/VoiceOfChanges/Index.tsx`
- `/resources/js/pages/Admin/VoiceOfChanges/Show.tsx`

### 5. Update Navigation

**Admin Sidebar:**
Add "Voice of Changes" menu item for admin to review submissions

**Member Navigation:**
Add "My Messages" or "Voice of Changes" menu item

### 6. Display on Homepage

Add section on homepage to display approved and published voice of changes messages

## Security Considerations

1. **Authorization Gates:** Consider using Laravel Gates for fine-grained permissions
2. **Form Requests:** Create dedicated FormRequest classes for validation
3. **Policy Classes:** Create policies for VoiceOfChange and User models
4. **Middleware Stack:** Ensure proper middleware ordering
5. **XSS Protection:** Sanitize user input, especially in voice of changes messages

## Testing Checklist

- [ ] Admin can access all features
- [ ] Member can update profile (except name and membership_number)
- [ ] Member can submit voice of changes
- [ ] Member submissions default to pending status
- [ ] Admin can approve/reject member submissions
- [ ] Only approved messages show on homepage
- [ ] User can only update own profile
- [ ] User cannot access admin features
- [ ] User cannot submit voice of changes
- [ ] Middleware properly restricts routes by role
