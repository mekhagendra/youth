import React from 'react';
import { Head} from '@inertiajs/react';
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
        totalTeams: number;
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
    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
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
                            <h3 className="text-lg font-semibold">Total Access Users</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900">
                            <h3 className="text-lg font-semibold">Total Teams</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.totalTeams}</p>
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
                    {/* <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
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
                    </div> */}
                </div>

                
            </div>
        </AppLayout>
    );
}