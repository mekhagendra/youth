import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
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
}

interface WorkingAreasIndexProps extends PageProps {
    workingAreas: WorkingArea[];
}

export default function Index({ auth, workingAreas }: WorkingAreasIndexProps) {
    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            router.delete(`/admin/working-areas/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Working Areas Management" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Working Areas</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage your organization's working areas
                            </p>
                        </div>
                        <Link
                            href="/admin/working-areas/create"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-25 transition"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Area
                        </Link>
                    </div>

                    {/* Working Areas Grid */}
                    {workingAreas.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <p className="text-gray-500 text-lg">No working areas found.</p>
                            <Link
                                href="/admin/working-areas/create"
                                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create your first working area
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {workingAreas.map((area) => (
                                <div
                                    key={area.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    {/* Image */}
                                    {area.image_url ? (
                                        <div className="h-48 bg-gray-200">
                                            <img
                                                src={area.image_url}
                                                alt={area.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-4xl font-bold">
                                                {area.title.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 flex-1">
                                                {area.title}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    area.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {area.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {area.description}
                                        </p>
                                        <div className="text-xs text-gray-500 mb-4">
                                            <span className="font-medium">Slug:</span> {area.slug}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-4">
                                            <span className="font-medium">Order:</span> {area.display_order}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/admin/working-areas/${area.id}`}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/working-areas/${area.id}/edit`}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Edit className="w-3 h-3 mr-1" />
                                                    Edit
                                                </Link>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(area.id, area.title)}
                                                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                <Trash2 className="w-3 h-3 mr-1" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
