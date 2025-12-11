import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import RichTextEditor from '@/components/RichTextEditor';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        image: null as File | null,
        is_active: true,
        display_order: 0,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/working-areas', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Add New Working Area" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href="/admin/working-areas"
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Working Areas
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Add New Working Area</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Create a new working area for your organization
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g., Youth Empowerment"
                                    className="mt-1"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Slug */}
                            <div>
                                <Label htmlFor="slug">Slug (optional)</Label>
                                <Input
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="Leave empty to auto-generate from title"
                                    className="mt-1"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    URL-friendly version of the title. Leave empty to auto-generate.
                                </p>
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <div className="mt-1">
                                    <RichTextEditor
                                        value={data.description}
                                        onChange={(value) => setData('description', value)}
                                        placeholder="Describe this working area..."
                                        error={errors.description}
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Use the toolbar to format your text with headings, lists, and more.
                                </p>
                            </div>

                            {/* Image */}
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                />
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                )}
                                {imagePreview && (
                                    <div className="mt-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="rounded-lg max-h-64 object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Display Order */}
                            <div>
                                <Label htmlFor="display_order">Display Order</Label>
                                <Input
                                    id="display_order"
                                    type="number"
                                    value={data.display_order}
                                    onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                    min="0"
                                    className="mt-1"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Lower numbers appear first
                                </p>
                                {errors.display_order && (
                                    <p className="mt-1 text-sm text-red-600">{errors.display_order}</p>
                                )}
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <Label htmlFor="is_active" className="ml-2 mb-0">
                                    Active (visible to public)
                                </Label>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href="/admin/working-areas"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Working Area'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
