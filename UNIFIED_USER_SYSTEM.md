# Unified User Management System

## Overview
Merging user and membership features into a single, comprehensive user management system with role-based access control and application approval workflow.

## User Types (Enum)
1. **Guest** - Default for self-registered users
2. **Member** - Approved members with membership number
3. **Volunteer** - Approved volunteers with membership number
4. **Intern** - Approved interns with membership number  
5. **Employee** - Staff members with membership number
6. **System Admin** - Full system access (no membership number)
7. **System Manager** - Management access (no membership number)

## User Status (Enum)
- **Pending** - Application submitted, awaiting approval
- **Active** - Approved and active
- **Inactive** - Deactivated account
- **Rejected** - Application rejected

## Key Features

### 1. Self-Registration
- Users register with `user_type` = 'Guest' and `status` = 'Active'
- Can browse website and submit voice of changes (pending approval)

### 2. Application System
- Guest users can apply to become Member, Volunteer, or Intern
- Applications go to admin for approval
- Upon approval:
  - `user_type` updated
  - `status` set to 'Active'
  - `membership_number` auto-generated (except for System Admin/Manager)
  - Application record archived

### 3. Admin Direct Creation
- Admins can directly create users with any type
- Bypass application process
- Set status directly

### 4. Membership Number Logic
- **Has membership_number**: Member, Volunteer, Intern, Employee
- **No membership_number**: Guest, System Admin, System Manager

### 5. Profile Update Restrictions
- All users can update: email, profile_picture, designation, phone, address, date_of_birth, gender
- **Cannot update**: name, membership_number
- **Exception**: System Admin can update all fields for any user

### 6. Voice of Changes
- **All authenticated users** can submit messages
- Messages require admin approval before public display
- New field: `published_online` (boolean) to control public visibility

### 7. Default System Admin
- Email: **admin@youth.org.np**
- Created via seeder
- `user_type` = 'System Admin'
- `status` = 'Active'

## Database Changes

### Users Table Updates
```sql
- Change `role` to `user_type` ENUM
- Add `status` ENUM (Pending, Active, Inactive, Rejected)
- Keep `membership_number` (nullable, unique)
- Auto-increment `id` (primary key)
```

### New: User Applications Table
```sql
- id
- user_id (foreign key)
- requested_user_type (Member, Volunteer, Intern)
- application_data (JSON - additional info)
- status (Pending, Approved, Rejected)
- admin_notes
- admin_id (who processed)
- timestamps
```

### Voice of Changes Updates
```sql
- Add `published_online` BOOLEAN (default false)
- Admin approval sets `status` = 'approved'
- `published_online` = true makes it visible on homepage
```

## Permission Matrix

| Action | Guest | Member | Volunteer | Intern | Employee | Sys Admin | Sys Manager |
|--------|-------|--------|-----------|--------|----------|-----------|-------------|
| View Public Pages | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Submit Voice of Changes | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Apply for Membership | ✓ | - | - | - | - | - | - |
| Update Own Profile | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View Membership Number | - | ✓ | ✓ | ✓ | ✓ | - | - |
| Admin Dashboard | - | - | - | - | - | ✓ | ✓ |
| Approve Applications | - | - | - | - | - | ✓ | ✓ |
| Manage All Users | - | - | - | - | - | ✓ | ✓ |
| System Settings | - | - | - | - | - | ✓ | - |

## Migration Strategy

### Phase 1: Database
1. Create user_applications table
2. Update users table (role → user_type, add status)
3. Add published_online to voice_of_changes
4. Migrate existing data (role → user_type mapping)

### Phase 2: Backend
1. Update User model with new enums and methods
2. Update middleware (AdminMiddleware, CheckRole)
3. Create UserApplicationController
4. Update VoiceOfChangeController
5. Update all controllers using role checks

### Phase 3: Frontend
1. Merge Users and Members admin pages
2. Add application submission UI
3. Add application approval UI  
4. Update sidebar based on user_type
5. Update all role checks in components

### Phase 4: Data Seeding
1. Create default admin@youth.org.np
2. Generate membership numbers for existing members

## Implementation Notes

- Existing 'admin' role → 'System Admin'
- Existing 'member' role → 'Member'
- Existing 'user' role → 'Guest'
- Preserve all existing data
- Add comprehensive logging for user type changes
