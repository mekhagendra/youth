import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Edit, Calendar, MapPin, Users, Award, CheckCircle } from 'lucide-react';
import { PageProps, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Activity Management',
        href: '/admin/activities',
    },
    {
        title: 'View Activity',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    title: string;
    description: string;
    content: string | null;
    image_path: string | null;
    location: string;
    date: string;
    category: string;
    participants: number | null;
    organizer: string;
    status: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    user?: User;
}

interface Props extends PageProps {
    activity: Activity;
}

export default function Show({ auth, activity }: Props) {
    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    const getCategoryBadge = (category: string) => {
        const badges: Record<string, string> = {
            workshop: 'bg-blue-100 text-blue-800',
            seminar: 'bg-purple-100 text-purple-800',
            training: 'bg-green-100 text-green-800',
            community: 'bg-yellow-100 text-yellow-800',
            awareness: 'bg-red-100 text-red-800',
        };
        return badges[category] || 'bg-gray-100 text-gray-800';
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            upcoming: 'bg-blue-100 text-blue-800',
            ongoing: 'bg-green-100 text-green-800',
            completed: 'bg-gray-100 text-gray-800',
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={activity.title} />

            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/admin/activities"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Activities
                    </Link>

                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        {/* Header with Image */}
                        {activity.image_path && (
                            <div className="w-full h-64 overflow-hidden">
                                <img
                                    src={`/storage/${activity.image_path}`}
                                    alt={activity.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-6">
                            {/* Title and Actions */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {activity.title}
                                    </h1>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(activity.category)}`}>
                                            {activity.category}
                                        </span>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(activity.status)}`}>
                                            {activity.status}
                                        </span>
                                        {activity.is_active ? (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <Link
                                    href={`/admin/activities/${activity.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Link>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b">
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Date</p>
                                        <p className="text-sm text-gray-900">
                                            {new Date(activity.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Location</p>
                                        <p className="text-sm text-gray-900">{activity.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Organizer</p>
                                        <p className="text-sm text-gray-900">{activity.organizer}</p>
                                    </div>
                                </div>

                                {activity.participants && (
                                    <div className="flex items-start space-x-3">
                                        <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Participants</p>
                                            <p className="text-sm text-gray-900">{activity.participants}</p>
                                        </div>
                                    </div>
                                )}

                                {activity.user && (
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Created By</p>
                                            <p className="text-sm text-gray-900">{activity.user.name}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Display Order</p>
                                        <p className="text-sm text-gray-900">{activity.sort_order}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                            </div>

                            {/* Content */}
                            {activity.content && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Detailed Information</h2>
                                    <div 
                                        className="prose max-w-none text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: activity.content }}
                                    />
                                </div>
                            )}

                            {/* Timestamps */}
                            <div className="pt-6 border-t">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <span className="font-medium">Created:</span> {new Date(activity.created_at).toLocaleString()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Last Updated:</span> {new Date(activity.updated_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
