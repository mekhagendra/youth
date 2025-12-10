import React, { useState, FormEvent } from 'react';
import { Head, router } from '@inertiajs/react';
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
    show_phone: boolean;
    show_email: boolean;
    photo: string | null;
}

interface EditProps extends PageProps {
    member: Member;
}

export default function Edit({ auth, member }: EditProps) {
    // Client-side security check
    if (!auth.user || auth.user.role !== 'admin') {
        window.location.href = '/login';
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
            title: `Edit ${member.name}`,
            href: `/admin/members/${member.id}/edit`,
        },
    ];

    const [formData, setFormData] = useState({
        name: member.name || '',
        email: member.email || '',
        phone: member.phone || '',
        address: member.address || '',
        description: member.description || '',
        is_active: member.is_active,
        is_lifetime_member: member.is_lifetime_member,
        show_phone: member.show_phone,
        show_email: member.show_email,
    });

    const [photo, setPhoto] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('_method', 'PUT');
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('description', formData.description);
        data.append('is_active', formData.is_active ? '1' : '0');
        data.append('is_lifetime_member', formData.is_lifetime_member ? '1' : '0');
        data.append('show_phone', formData.show_phone ? '1' : '0');
        data.append('show_email', formData.show_email ? '1' : '0');
        
        if (photo) {
            data.append('photo', photo);
        }

        router.post(`/admin/members/${member.id}`, data, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${member.name}`} />

            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Edit Member: {member.membership_id}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
                        {/* Current Photo */}
                        {member.photo && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Current Photo
                                </label>
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="h-32 w-32 rounded-full object-cover"
                                />
                            </div>
                        )}

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Photo */}
                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Update Photo
                            </label>
                            <input
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    dark:file:bg-gray-700 dark:file:text-gray-300"
                            />
                            {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Active Member
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_lifetime_member"
                                    checked={formData.is_lifetime_member}
                                    onChange={(e) => setFormData({ ...formData, is_lifetime_member: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_lifetime_member" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Lifetime Member
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="show_phone"
                                    checked={formData.show_phone}
                                    onChange={(e) => setFormData({ ...formData, show_phone: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="show_phone" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Show Phone Publicly
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="show_email"
                                    checked={formData.show_email}
                                    onChange={(e) => setFormData({ ...formData, show_email: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="show_email" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Show Email Publicly
                                </label>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                            >
                                Update Member
                            </button>
                            <button
                                type="button"
                                onClick={() => router.visit('/admin/members')}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
