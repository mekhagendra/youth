<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
        'status',
        'is_active',
        'membership_number',
        'phone',
        'address',
        'date_of_birth',
        'gender',
        'profile_picture',
        'designation',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'date_of_birth' => 'date',
            'is_active' => 'boolean',
        ];
    }
    /**
     * Get the content created by the user.
     */
    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    /**
     * Get the voice of changes submitted by the user.
     */
    public function voiceOfChanges()
    {
        return $this->hasMany(VoiceOfChange::class);
    }

    /**
     * Get the user's applications.
     */
    public function applications()
    {
        return $this->hasMany(UserApplication::class);
    }

    /**
     * Get applications processed by this admin.
     */
    public function processedApplications()
    {
        return $this->hasMany(UserApplication::class, 'admin_id');
    }

    // ========== User Type Checks ==========
    
    /**
     * Check if user is System Admin.
     */
    public function isSystemAdmin(): bool
    {
        return $this->user_type === 'System Admin';
    }

    /**
     * Check if user is System Manager.
     */
    public function isSystemManager(): bool
    {
        return $this->user_type === 'System Manager';
    }

    /**
     * Check if user has admin privileges (System Admin or System Manager).
     */
    public function isAdmin(): bool
    {
        return $this->isSystemAdmin() || $this->isSystemManager();
    }

    /**
     * Check if user is Member.
     */
    public function isMember(): bool
    {
        return $this->user_type === 'Member';
    }

    /**
     * Check if user is Volunteer.
     */
    public function isVolunteer(): bool
    {
        return $this->user_type === 'Volunteer';
    }

    /**
     * Check if user is Intern.
     */
    public function isIntern(): bool
    {
        return $this->user_type === 'Intern';
    }

    /**
     * Check if user is Employee.
     */
    public function isEmployee(): bool
    {
        return $this->user_type === 'Employee';
    }

    /**
     * Check if user is Guest.
     */
    public function isGuest(): bool
    {
        return $this->user_type === 'Guest';
    }

    /**
     * Check if user has membership number (Member, Volunteer, Intern, Employee).
     */
    public function hasMembershipNumber(): bool
    {
        return in_array($this->user_type, ['Member', 'Volunteer', 'Intern', 'Employee']);
    }

    /**
     * Check if user can apply for membership types.
     */
    public function canApplyForMembership(): bool
    {
        return $this->isGuest() && $this->status === 'Active';
    }

    /**
     * Check if user account is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'Active' && $this->is_active;
    }

    // ========== Permission Checks ==========

    /**
     * Check if user can manage content.
     */
    public function canManageContent(): bool
    {
        return $this->isAdmin() || $this->isMember() || $this->isEmployee();
    }

    /**
     * Check if user can access admin dashboard.
     */
    public function canAccessAdminDashboard(): bool
    {
        return $this->isAdmin();
    }

    /**
     * Check if user can approve applications.
     */
    public function canApproveApplications(): bool
    {
        return $this->isAdmin();
    }

    /**
     * Check if user can manage all users.
     */
    public function canManageUsers(): bool
    {
        return $this->isAdmin();
    }

    /**
     * Check if user can modify system settings.
     */
    public function canModifySystemSettings(): bool
    {
        return $this->isSystemAdmin();
    }

    /**
     * Check if user can submit voice of changes.
     */
    public function canSubmitVoiceOfChanges(): bool
    {
        return $this->isActive(); // All active users can submit
    }

    /**
     * Check if user can edit their own voice of changes.
     */
    public function canEditVoiceOfChanges($voiceOfChange): bool
    {
        return $this->id === $voiceOfChange->user_id && 
               in_array($voiceOfChange->status, ['pending', 'rejected']);
    }

    /**
     * Check if user can approve voice of changes.
     */
    public function canApproveVoiceOfChanges(): bool
    {
        return $this->isAdmin();
    }

    /**
     * Get user's full display name with type.
     */
    public function getDisplayName(): string
    {
        return "{$this->name} ({$this->user_type})";
    }

    /**
     * Get user's role for backward compatibility.
     * @deprecated Use user_type instead
     */
    public function getRoleAttribute(): string
    {
        return match($this->user_type) {
            'System Admin', 'System Manager' => 'admin',
            'Member', 'Volunteer', 'Intern', 'Employee' => 'member',
            default => 'user',
        };
    }
}
