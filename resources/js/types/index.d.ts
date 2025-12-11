import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type UserType = 'Guest' | 'Member' | 'Volunteer' | 'Intern' | 'Employee' | 'System Admin' | 'System Manager';
export type UserStatus = 'Pending' | 'Active' | 'Inactive' | 'Rejected';

export interface User {
    id: number;
    name: string;
    email: string;
    user_type: UserType;
    status: UserStatus;
    is_active: boolean;
    avatar?: string;
    profile_picture?: string;
    designation?: string;
    membership_number?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    gender?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    // Deprecated - use user_type instead
    role?: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type ApplicationUserType = 'Member' | 'Volunteer' | 'Intern';
export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface UserApplication {
    id: number;
    user_id: number;
    requested_user_type: ApplicationUserType;
    application_data?: Record<string, unknown>;
    status: ApplicationStatus;
    admin_notes?: string;
    admin_id?: number;
    processed_at?: string;
    created_at: string;
    updated_at: string;
    user?: User;
    admin?: User;
}

export interface PageProps {
    auth: Auth;
    [key: string]: unknown;
}
