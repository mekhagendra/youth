import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Download, Calendar, User, FileType, Eye } from 'lucide-react';
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
    download_count: number;
    is_active: boolean;
    display_order: number;
}

interface ShowProps extends PageProps {
    resource: Resource;
}

export default function Show({ resource }: ShowProps) {
    const getFileIcon = (fileType: string) => {
        const type = fileType.toLowerCase();
        if (type === 'pdf') return '📕';
        if (['doc', 'docx'].includes(type)) return '📘';
        if (['xls', 'xlsx'].includes(type)) return '📗';
        if (['ppt', 'pptx'].includes(type)) return '📙';
        return '📄';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout>
            <Head title={`Resource: ${resource.name}`} />

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
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Resource Details</h2>
                            <Link
                                href={`/admin/resources/${resource.id}/edit`}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Edit Resource
                            </Link>
                        </div>
                    </div>

                    {/* Resource Card */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        {/* File Icon Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-center">
                            <div className="text-6xl mb-4">
                                {getFileIcon(resource.file_type)}
                            </div>
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-lg font-medium">
                                {resource.file_type.toUpperCase()}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Status Badge */}
                            <div className="flex items-center gap-3">
                                <span
                                    className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                        resource.is_active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {resource.is_active ? 'Active' : 'Inactive'}
                                </span>
                                {resource.category && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                        {resource.category}
                                    </span>
                                )}
                            </div>

                            {/* Resource Name */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {resource.name}
                                </h3>
                                {resource.description && (
                                    <p className="text-gray-600 leading-relaxed">
                                        {resource.description}
                                    </p>
                                )}
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <User className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Publisher</p>
                                            <p className="text-base text-gray-900">{resource.publisher}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Calendar className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Published Date</p>
                                            <p className="text-base text-gray-900">{formatDate(resource.published_date)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <FileType className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">File Size</p>
                                            <p className="text-base text-gray-900">{resource.file_size}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Download className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Download Count</p>
                                            <p className="text-base text-gray-900">{resource.download_count} downloads</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="pt-6 border-t">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Display Order:</span>
                                        <span className="ml-2 font-medium text-gray-900">{resource.display_order}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Resource ID:</span>
                                        <span className="ml-2 font-medium text-gray-900">#{resource.id}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="pt-6 border-t">
                                <Link
                                    href={`/resources/${resource.id}/download`}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                                >
                                    <Download className="h-5 w-5" />
                                    Download File
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
