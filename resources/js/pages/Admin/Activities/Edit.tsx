import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';
import { ArrowLeft } from 'lucide-react';

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
        title: 'Edit Activity',
        href: '#',
    },
];

interface Activity {
    id: number;
    title: string;
    description: string;
    content: string | null;
    image_path: string | null;
    location: string;
    date: string;
    category: 'workshop' | 'seminar' | 'training' | 'community' | 'awareness';
    participants: number | null;
    organizer: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    is_active: boolean;
    sort_order: number;
}

interface Props extends PageProps {
    activity: Activity;
}

interface FormData {
    title: string;
    description: string;
    content: string;
    image: File | null;
    location: string;
    date: string;
    category: 'workshop' | 'seminar' | 'training' | 'community' | 'awareness';
    participants: number | '';
    organizer: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    is_active: boolean;
    sort_order: number;
    _method: string;
}

export default function Edit({ auth, activity }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        activity.image_path ? `/storage/${activity.image_path}` : null
    );

    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: activity.title,
        description: activity.description,
        content: activity.content || '',
        image: null,
        location: activity.location,
        date: activity.date,
        category: activity.category,
        participants: activity.participants || '',
        organizer: activity.organizer,
        status: activity.status,
        is_active: activity.is_active,
        sort_order: activity.sort_order,
        _method: 'PUT',
    });

    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/activities/${activity.id}`, {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${activity.title}`} />

            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/admin/activities"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Activities
                    </Link>

                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-xl font-semibold text-gray-900">Edit Activity</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="md:col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.title && (
                                        <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.description && (
                                        <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="md:col-span-2">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Detailed Content
                                    </label>
                                    <textarea
                                        id="content"
                                        rows={8}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.content && (
                                        <p className="mt-2 text-sm text-red-600">{errors.content}</p>
                                    )}
                                </div>

                                {/* Image */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Activity Image
                                    </label>
                                    {imagePreview && (
                                        <div className="mb-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-32 w-32 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Leave empty to keep current image
                                    </p>
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.location && (
                                        <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                                    )}
                                </div>

                                {/* Date */}
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.date && (
                                        <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value as 'workshop' | 'seminar' | 'training' | 'community' | 'awareness')}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="workshop">Workshop</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="training">Training</option>
                                        <option value="community">Community Service</option>
                                        <option value="awareness">Awareness Campaign</option>
                                    </select>
                                    {errors.category && (
                                        <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as 'upcoming' | 'ongoing' | 'completed')}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>

                                {/* Participants */}
                                <div>
                                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
                                        Participants
                                    </label>
                                    <input
                                        type="number"
                                        id="participants"
                                        value={data.participants}
                                        onChange={(e) => setData('participants', e.target.value ? parseInt(e.target.value) : '')}
                                        min="1"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.participants && (
                                        <p className="mt-2 text-sm text-red-600">{errors.participants}</p>
                                    )}
                                </div>

                                {/* Organizer */}
                                <div>
                                    <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">
                                        Organizer *
                                    </label>
                                    <input
                                        type="text"
                                        id="organizer"
                                        value={data.organizer}
                                        onChange={(e) => setData('organizer', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.organizer && (
                                        <p className="mt-2 text-sm text-red-600">{errors.organizer}</p>
                                    )}
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        id="sort_order"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        min="0"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.sort_order && (
                                        <p className="mt-2 text-sm text-red-600">{errors.sort_order}</p>
                                    )}
                                </div>

                                {/* Active Status */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                            Active (visible to public)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href="/admin/activities"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Activity'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
