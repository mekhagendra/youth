import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';

interface Member {
    id: number;
    membership_id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    description: string | null;
    member_since: string | null;
    is_active: boolean;
    is_lifetime_member: boolean;
    is_self_registered: boolean;
    show_phone: boolean;
    show_email: boolean;
    photo: string | null;
    created_at: string;
    updated_at: string;
}

interface ShowProps extends PageProps {
    member: Member;
}

export default function Show({ auth, member }: ShowProps) {
    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Member Management',
            href: '/admin/members',
        },
        {
            title: member.name,
            href: `/admin/members/${member.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Member: ${member.name}`} />

            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Member Details
                        </h1>
                        <div className="flex gap-2">
                            <Link
                                href={`/admin/members/${member.id}/edit`}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Edit Member
                            </Link>
                            <Link
                                href="/admin/members"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                            >
                                Back to List
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            {/* Photo and Basic Info */}
                            <div className="flex items-start gap-6 mb-6">
                                {member.photo ? (
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="h-32 w-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="text-gray-500 dark:text-gray-400 text-4xl font-medium">
                                            {member.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {member.name}
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                                        {member.membership_id}
                                    </p>
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                            member.is_active 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                            {member.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                        {member.is_lifetime_member && (
                                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                Lifetime Member
                                            </span>
                                        )}
                                        {member.is_self_registered && (
                                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                Self-Registered
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{member.email}</p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {member.show_email ? '(Visible publicly)' : '(Hidden from public)'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{member.phone || 'N/A'}</p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {member.show_phone ? '(Visible publicly)' : '(Hidden from public)'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{member.address || 'N/A'}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{member.member_since || 'N/A'}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                                        {member.description || 'No description provided'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{member.created_at}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{member.updated_at}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
