import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft } from 'lucide-react';
import { FormEvent } from 'react';
import { PageProps } from '@/types';

export default function Create({ }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        publisher: '',
        published_date: '',
        file: null as File | null,
        category: '',
        is_active: true,
        display_order: 0,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/resources', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Add New Resource" />

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
                        <h2 className="text-2xl font-bold text-gray-900">Add New Resource</h2>
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

                        {/* File Upload */}
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                Upload File * (Max: 100MB)
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
                                required
                            />
                            {errors.file && (
                                <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP, etc.
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
                                {processing ? 'Creating...' : 'Create Resource'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
