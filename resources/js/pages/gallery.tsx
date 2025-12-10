import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Camera, Search, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';
import { PageProps } from '@/types';

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

interface GalleryPageProps extends PageProps {
    images: GalleryImage[];
}

export default function GalleryPage({ images }: GalleryPageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Filter images based on search
    const filteredImages = images.filter(image => {
        const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (image.category && image.category.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
    });

    const openLightbox = (image: GalleryImage) => {
        setSelectedImage(image);
        setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        const newIndex = direction === 'next' 
            ? (currentImageIndex + 1) % filteredImages.length
            : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        
        setCurrentImageIndex(newIndex);
        setSelectedImage(filteredImages[newIndex]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateImage('prev');
        } else if (e.key === 'ArrowRight') {
            navigateImage('next');
        }
    };

    return (
        <>
            <Head title="Gallery - Youth Initiative Nepal" />
            <PublicHeader />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <Camera className="h-16 w-16 mx-auto mb-6" />
                        <h1 className="text-5xl font-bold mb-6">Photo Gallery</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Explore our visual journey through impactful moments, community engagement, and transformative experiences.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Search Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search photos by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Results Count */}
                            <span className="text-gray-600 font-medium ml-4">
                                {filteredImages.length} Photos
                            </span>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredImages.map((image) => (
                            <div 
                                key={image.id}
                                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-64"
                                onClick={() => openLightbox(image)}
                            >
                                {/* Image */}
                                <img 
                                    src={`/storage/${image.image_path}`} 
                                    alt={image.alt_text || image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* View Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                        <Eye className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-sm font-bold text-center line-clamp-2">
                                        {image.title}
                                    </h3>
                                    {image.category && (
                                        <p className="text-xs text-center opacity-80 mt-1">{image.category}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredImages.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <Camera className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Photos Found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    {/* Navigation Arrows */}
                    <button
                        onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                    >
                        <ChevronLeft className="h-12 w-12" />
                    </button>
                    
                    <button
                        onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                    >
                        <ChevronRight className="h-12 w-12" />
                    </button>

                    {/* Image Container */}
                    <div 
                        className="relative max-w-4xl max-h-[80vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={`/storage/${selectedImage.image_path}`} 
                            alt={selectedImage.alt_text || selectedImage.title}
                            className="w-full h-full object-contain rounded-lg"
                        />
                        
                        {/* Image Info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
                            <h3 className="text-xl font-bold text-center">{selectedImage.title}</h3>
                            {selectedImage.description && (
                                <p className="text-sm text-center mt-2 opacity-90">{selectedImage.description}</p>
                            )}
                            {selectedImage.category && (
                                <p className="text-xs text-center mt-1 opacity-75">Category: {selectedImage.category}</p>
                            )}
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {filteredImages.length}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}