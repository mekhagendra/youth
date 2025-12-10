import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft } from 'lucide-react';
import { FormEvent } from 'react';
import { PageProps } from '@/types';

interface Resource {
    id: number;
    name: string;
    description: string | null;
    publisher: string;
    published_date: string;
    file_type: string;
    file_path: string;
    file_size: string;
    category: string | null;
    is_active: boolean;
    display_order: number;
}

interface EditProps extends PageProps {
    resource: Resource;
}

export default function Edit({ resource }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: resource.name,
        description: resource.description || '',
        publisher: resource.publisher,
        published_date: resource.published_date,
        file: null as File | null,
        category: resource.category || '',
        is_active: resource.is_active,
        display_order: resource.display_order,
        _method: 'PUT',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(`/admin/resources/${resource.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title={`Edit Resource: ${resource.name}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href="/admin/resources"
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back to Resources
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-900">Edit Resource</h2>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                        {/* Resource Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Resource Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Publisher */}
                            <div>
                                <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
                                    Publisher *
                                </label>
                                <input
                                    type="text"
                                    id="publisher"
                                    value={data.publisher}
                                    onChange={(e) => setData('publisher', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.publisher && (
                                    <p className="mt-1 text-sm text-red-600">{errors.publisher}</p>
                                )}
                            </div>

                            {/* Published Date */}
                            <div>
                                <label htmlFor="published_date" className="block text-sm font-medium text-gray-700">
                                    Published Date *
                                </label>
                                <input
                                    type="date"
                                    id="published_date"
                                    value={data.published_date}
                                    onChange={(e) => setData('published_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.published_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.published_date}</p>
                                )}
                            </div>
                        </div>

                        {/* Current File Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <p className="text-sm text-blue-800">
                                <span className="font-medium">Current File:</span> {resource.file_type.toUpperCase()} • {resource.file_size}
                            </p>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                Replace File (Optional, Max: 100MB)
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                            {errors.file && (
                                <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Leave empty to keep the current file. Upload a new file to replace it.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g., Reports, Guides, Publications"
                                />
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>

                            {/* Display Order */}
                            <div>
                                <label htmlFor="display_order" className="block text-sm font-medium text-gray-700">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    id="display_order"
                                    value={data.display_order}
                                    onChange={(e) => setData('display_order', parseInt(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.display_order && (
                                    <p className="mt-1 text-sm text-red-600">{errors.display_order}</p>
                                )}
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                Active (visible to public)
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t">
                            <Link
                                href="/admin/resources"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Resource'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
