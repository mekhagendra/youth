import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gallery Management',
        href: '/admin/gallery',
    },
    {
        title: 'Edit Image',
        href: '#',
    },
];

interface GalleryImage {
    id: number;
    title: string;
    description: string | null;
    image_path: string;
    alt_text: string | null;
    sort_order: number;
    is_active: boolean;
    category: string | null;
    created_at: string;
    updated_at: string;
}

interface EditProps extends PageProps {
    galleryImage: GalleryImage;
}

interface FormData {
    title: string;
    description: string;
    image?: File | null;
    alt_text: string;
    sort_order: number;
    is_active: boolean;
    category: string;
    _method: string;
}

export default function Edit({ auth, galleryImage }: EditProps) {
    // Client-side security check
    if (!auth.user || auth.user.role !== 'admin') {
        window.location.href = '/login';
        return null;
    }

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: galleryImage.title,
        description: galleryImage.description || '',
        image: null,
        alt_text: galleryImage.alt_text || '',
        sort_order: galleryImage.sort_order,
        is_active: galleryImage.is_active,
        category: galleryImage.category || '',
        _method: 'put',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/gallery/${galleryImage.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${galleryImage.title}`} />

            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-xl font-semibold text-gray-900">Edit Gallery Image</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Current Image and Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Image
                                </label>
                                <div className="mb-4">
                                    <img
                                        src={`/storage/${galleryImage.image_path}`}
                                        alt={galleryImage.alt_text || galleryImage.title}
                                        className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                                    />
                                </div>
                                
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Replace Image (Optional)
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <div className="mb-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="New preview"
                                                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="image"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                            >
                                                <span>{imagePreview ? 'Change image' : 'Upload a new file'}</span>
                                                <input
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 2MB
                                        </p>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter image title"
                                />
                                {errors.title && (
                                    <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter image description"
                                />
                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Alt Text */}
                            <div>
                                <label htmlFor="alt_text" className="block text-sm font-medium text-gray-700">
                                    Alt Text
                                </label>
                                <input
                                    type="text"
                                    id="alt_text"
                                    value={data.alt_text}
                                    onChange={(e) => setData('alt_text', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Alternative text for accessibility"
                                />
                                {errors.alt_text && (
                                    <p className="mt-2 text-sm text-red-600">{errors.alt_text}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g., Events, Activities"
                                    />
                                    {errors.category && (
                                        <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">
                                        Sort Order
                                    </label>
                                    <input
                                        type="number"
                                        id="sort_order"
                                        min="0"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.sort_order && (
                                        <p className="mt-2 text-sm text-red-600">{errors.sort_order}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                            Active
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <a
                                    href="/admin/gallery"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Image'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}