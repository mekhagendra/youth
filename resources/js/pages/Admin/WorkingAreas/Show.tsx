import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Edit, Calendar, Hash, ToggleLeft, ToggleRight } from 'lucide-react';
import { PageProps } from '@/types';

interface WorkingArea {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_url: string | null;
    is_active: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    workingArea: WorkingArea;
}

export default function Show({ auth, workingArea }: Props) {
    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    return (
        <AppLayout>
            <Head title={workingArea.title} />

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
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">{workingArea.title}</h1>
                            <Link
                                href={`/admin/working-areas/${workingArea.id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {/* Image */}
                        {workingArea.image_url && (
                            <div className="w-full h-64 overflow-hidden">
                                <img
                                    src={workingArea.image_url}
                                    alt={workingArea.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Details */}
                        <div className="p-6 space-y-6">
                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4 pb-6 border-b">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Hash className="w-4 h-4" />
                                    <span>Slug: <span className="font-mono text-gray-900">{workingArea.slug}</span></span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    {workingArea.is_active ? (
                                        <>
                                            <ToggleRight className="w-4 h-4 text-green-600" />
                                            <span className="text-green-600 font-medium">Active</span>
                                        </>
                                    ) : (
                                        <>
                                            <ToggleLeft className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-400 font-medium">Inactive</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Display Order: {workingArea.display_order}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Created: {workingArea.created_at}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                <div 
                                    className="prose max-w-none text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: workingArea.description }}
                                />
                            </div>

                            {/* Timestamps */}
                            <div className="pt-6 border-t">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <span className="font-medium">Created:</span> {workingArea.created_at}
                                    </div>
                                    <div>
                                        <span className="font-medium">Last Updated:</span> {workingArea.updated_at}
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
