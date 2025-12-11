import { Head, usePage } from '@inertiajs/react';
import { FileText, Download, Calendar, User, FileType, Eye } from 'lucide-react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';
import { PageProps } from '@/types';
import { useState } from 'react';

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
}

interface ResourcesProps extends PageProps {
    resources: Resource[];
}

export default function Resources() {
    const { resources } = usePage<ResourcesProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Get unique categories
    const categories = Array.from(new Set(resources.map(r => r.category).filter(Boolean)));

    // Filter resources
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            resource.publisher.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getFileIcon = (fileType: string) => {
        const type = fileType.toLowerCase();
        if (type === 'pdf') return '📕';
        if (['doc', 'docx'].includes(type)) return '📘';
        if (['xls', 'xlsx'].includes(type)) return '📗';
        if (['ppt', 'pptx'].includes(type)) return '📙';
        if (['zip', 'rar'].includes(type)) return '📦';
        if (['jpg', 'jpeg', 'png', 'gif'].includes(type)) return '🖼️';
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
        <>
            <Head title="Resources - Youth Initiative" />
            <PublicHeader />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="bg-gradient-to-r from-green-700 to-green-300 text-white pt-4 pb-2">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">Resources</h1>
                    </div>
                </div>
                {/* Search and Filter */}
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search resources..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Eye className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>

                            {/* Category Filter */}
                            <div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category!}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 text-sm text-gray-600">
                            Showing {filteredResources.length} of {resources.length} resources
                        </div>
                    </div>

                    {/* Resources Grid */}
                    {filteredResources.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResources.map((resource) => (
                                <div
                                    key={resource.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Card Header with File Icon */}
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center">
                                        <div className="text-6xl mb-3">
                                            {getFileIcon(resource.file_type)}
                                        </div>
                                        <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                                            {resource.file_type.toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6">
                                        {/* Category Badge */}
                                        {resource.category && (
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                                                {resource.category}
                                            </span>
                                        )}

                                        {/* Resource Name */}
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                            {resource.name}
                                        </h3>

                                        {/* Description */}
                                        {resource.description && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {resource.description}
                                            </p>
                                        )}

                                        {/* Resource Info */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <User className="h-4 w-4 mr-2 text-blue-500" />
                                                <span className="font-medium">Publisher:</span>
                                                <span className="ml-1">{resource.publisher}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                                <span className="font-medium">Published:</span>
                                                <span className="ml-1">{formatDate(resource.published_date)}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FileType className="h-4 w-4 mr-2 text-blue-500" />
                                                <span className="font-medium">Size:</span>
                                                <span className="ml-1">{resource.file_size}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Download className="h-4 w-4 mr-2 text-blue-500" />
                                                <span className="font-medium">Downloads:</span>
                                                <span className="ml-1">{resource.download_count}</span>
                                            </div>
                                        </div>

                                        {/* Download Button */}
                                        <a
                                            href={`/resources/${resource.id}/download`}
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                                        >
                                            <Download className="h-5 w-5" />
                                            Download Now
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-md">
                            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Resources Found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
