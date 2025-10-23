import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

interface DashboardProps extends PageProps {
    stats: {
        totalUsers: number;
        totalContent: number;
        totalGalleryImages?: number;
        totalActivities?: number;
        upcomingActivities?: number;
        recentUsers: Array<{
            id: number;
            name: string;
            email: string;
            created_at: string;
        }>;
    };
}

export default function Dashboard({ auth, stats }: DashboardProps) {
    // Client-side security check
    if (!auth.user || auth.user.role !== 'admin') {
        window.location.href = '/login';
        return null;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900">
                            <h3 className="text-lg font-semibold">Total Users</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900">
                            <h3 className="text-lg font-semibold">Total Content</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.totalContent}</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900">
                            <h3 className="text-lg font-semibold">Gallery Images</h3>
                            <p className="text-3xl font-bold text-purple-600">{stats.totalGalleryImages || 0}</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900">
                            <h3 className="text-lg font-semibold">Activities</h3>
                            <p className="text-3xl font-bold text-orange-600">{stats.totalActivities || 0}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {stats.upcomingActivities || 0} upcoming
                            </p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900">
                            <h3 className="text-lg font-semibold">Quick Actions</h3>
                            <div className="mt-2 space-y-2">
                                <Link
                                    href="/admin/users/create"
                                    className="block bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
                                >
                                    Add User
                                </Link>
                                <Link
                                    href="/admin/activities/create"
                                    className="block bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600"
                                >
                                    Add Activity
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Management Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* User Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">User Management</h3>
                                <Link
                                    href="/admin/users"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View All
                                </Link>
                            </div>
                            
                            <div className="space-y-3">
                                <Link
                                    href="/admin/users"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Manage Users</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                                <Link
                                    href="/admin/users/create"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Add New User</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Recent Users */}
                            <div className="mt-4">
                                <h4 className="font-medium mb-2">Recent Users</h4>
                                <div className="space-y-2">
                                    {stats.recentUsers.map((user) => (
                                        <div key={user.id} className="text-sm text-gray-600">
                                            <span className="font-medium">{user.name}</span>
                                            <span className="text-gray-400 ml-2">{user.email}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Content Management</h3>
                                <Link
                                    href="/admin/content"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View All
                                </Link>
                            </div>
                            
                            <div className="space-y-3">
                                <Link
                                    href="/admin/content"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Manage Content</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                                <Link
                                    href="/admin/content/create"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Create New Content</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                                <Link
                                    href="/admin/pages"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Manage Pages</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Gallery Management</h3>
                                <Link
                                    href="/admin/gallery"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View All
                                </Link>
                            </div>
                            
                            <div className="space-y-3">
                                <Link
                                    href="/admin/gallery"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Manage Images</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                                <Link
                                    href="/admin/gallery/create"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Upload New Image</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Activity Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Activity Management</h3>
                                <Link
                                    href="/admin/activities"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View All
                                </Link>
                            </div>
                            
                            <div className="space-y-3">
                                <Link
                                    href="/admin/activities"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Manage Activities</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                                <Link
                                    href="/admin/activities/create"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Create New Activity</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Supporter Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Supporter Management</h3>
                                <Link
                                    href="/admin/supporters"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View All
                                </Link>
                            </div>
                            
                            <div className="space-y-3">
                                <Link
                                    href="/admin/supporters"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Manage Supporters</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                                <Link
                                    href="/admin/supporters/create"
                                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                    <div className="flex justify-between">
                                        <span>Add New Supporter</span>
                                        <span className="text-gray-500">→</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}