import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Users',
        href: '/admin/users',
    },
    {
        title: 'Create User',
        href: '/admin/users/create',
    },
];

export default function Create({ auth }: PageProps) {
    // Move hooks to the top before any conditional returns
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        user_type: 'Guest',
        designation: '',
        profile_picture: null as File | null,
    });

    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Create User</h1>
                    <Link
                        href="/admin/users"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back to Users
                    </Link>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="user_type" className="block text-sm font-medium text-gray-700">
                                    User Type
                                </label>
                                <select
                                    id="user_type"
                                    value={data.user_type}
                                    onChange={(e) => setData('user_type', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="Guest">Guest</option>
                                    <option value="Member">Member</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Employee">Employee</option>
                                    <option value="System Manager">System Manager</option>
                                    <option value="System Admin">System Admin</option>
                                </select>
                                {errors.user_type && <div className="text-red-600 text-sm mt-1">{errors.user_type}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    id="designation"
                                    value={data.designation}
                                    onChange={(e) => setData('designation', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.designation && <div className="text-red-600 text-sm mt-1">{errors.designation}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="profile_picture"
                                    accept="image/*"
                                    onChange={(e) => setData('profile_picture', e.target.files?.[0] || null)}
                                    className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                />
                                {errors.profile_picture && <div className="text-red-600 text-sm mt-1">{errors.profile_picture}</div>}
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25"
                                >
                                    {processing ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}