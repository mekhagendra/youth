import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload } from 'lucide-react';
import { PageProps, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Supporters',
        href: '/admin/supporters',
    },
    {
        title: 'Create Supporter',
        href: '/admin/supporters/create',
    },
];

interface Props extends PageProps {}

const Create: React.FC<Props> = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        logo: null as File | null,
        website_url: '',
        display_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/supporters');
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Supporter" />
            
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center space-x-4 mb-6">
                    <Link
                        href="/admin/supporters"
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Supporters
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Supporter</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Supporter Name *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter supporter/organization name"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <Label htmlFor="logo">Logo *</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                                <div className="space-y-1 text-center">
                                    {previewUrl ? (
                                        <div className="mb-4">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="max-h-32 mx-auto object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="logo"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                        >
                                            <span>{previewUrl ? 'Change logo' : 'Upload a logo'}</span>
                                            <input
                                                id="logo"
                                                name="logo"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 2MB
                                    </p>
                                </div>
                            </div>
                            {errors.logo && (
                                <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
                            )}
                        </div>

                        {/* Website URL */}
                        <div>
                            <Label htmlFor="website_url">Website URL</Label>
                            <Input
                                id="website_url"
                                type="url"
                                value={data.website_url}
                                onChange={(e) => setData('website_url', e.target.value)}
                                placeholder="https://example.com"
                                className={errors.website_url ? 'border-red-500' : ''}
                            />
                            {errors.website_url && (
                                <p className="text-red-500 text-sm mt-1">{errors.website_url}</p>
                            )}
                        </div>

                        {/* Display Order */}
                        <div>
                            <Label htmlFor="display_order">Display Order *</Label>
                            <Input
                                id="display_order"
                                type="number"
                                value={data.display_order}
                                onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                placeholder="0"
                                min="0"
                                className={errors.display_order ? 'border-red-500' : ''}
                            />
                            <p className="text-gray-500 text-sm mt-1">
                                Lower numbers appear first in the supporter carousel
                            </p>
                            {errors.display_order && (
                                <p className="text-red-500 text-sm mt-1">{errors.display_order}</p>
                            )}
                        </div>

                        {/* Is Active */}
                        <div className="flex items-center">
                            <input
                                id="is_active"
                                name="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                Active (visible on website)
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <Link
                                href="/admin/supporters"
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-6"
                            >
                                {processing ? 'Creating...' : 'Create Supporter'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;