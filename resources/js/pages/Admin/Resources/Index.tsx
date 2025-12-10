import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FileText, Download, Calendar, User, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { PageProps } from '@/types';

interface Resource {
    id: number;
    name: string;
    description: string | null;
    publisher: string;
    published_date: string;
    file_type: string;
    file_size: string;
    category: string | null;
    download_count: number;
    is_active: boolean;
    display_order: number;
}

interface ResourcesIndexProps extends PageProps {
    resources: Resource[];
}

export default function Index({ resources }: ResourcesIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this resource?')) {
            router.delete(`/admin/resources/${id}`);
        }
    };

    const getFileIcon = (fileType: string) => {
        const type = fileType.toLowerCase();
        if (type === 'pdf') return '📕';
        if (['doc', 'docx'].includes(type)) return '📘';
        if (['xls', 'xlsx'].includes(type)) return '📗';
        if (['ppt', 'pptx'].includes(type)) return '📙';
        return '📄';
    };

    return (
        <AppLayout>
            <Head title="Manage Resources" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Header */}
                    <div className="md:flex md:items-center md:justify-between mb-6">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Resources Management
                            </h2>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <Link
                                href="/admin/resources/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Resource
                            </Link>
                        </div>
                    </div>

                    {/* Resources Table */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Resource
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Publisher
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        File Info
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Downloads
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {resources.map((resource) => (
                                    <tr key={resource.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-2xl mr-3">
                                                    {getFileIcon(resource.file_type)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {resource.name}
                                                    </div>
                                                    {resource.category && (
                                                        <div className="text-sm text-gray-500">
                                                            {resource.category}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{resource.publisher}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{resource.published_date}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <span className="font-medium">{resource.file_type.toUpperCase()}</span>
                                                <span className="text-gray-500"> • {resource.file_size}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Download className="h-4 w-4 mr-1" />
                                                {resource.download_count}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    resource.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {resource.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/resources/${resource.id}`}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <Eye className="h-5 w-5 inline" />
                                            </Link>
                                            <Link
                                                href={`/admin/resources/${resource.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                <Edit className="h-5 w-5 inline" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(resource.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-5 w-5 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {resources.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No resources</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Get started by adding a new resource.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href="/admin/resources/create"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Add Resource
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
