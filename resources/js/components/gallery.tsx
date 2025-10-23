import { useState } from 'react';
import { ArrowRight, Eye, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

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

interface GalleryProps {
    images?: GalleryImage[];
    showCount?: number;
    showViewAll?: boolean;
    className?: string;
}

export default function Gallery({ images = [], showCount = 6, showViewAll = true, className = "" }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Get images to display
    const displayImages = images.slice(0, showCount);

    const openLightbox = (image: GalleryImage) => {
        setSelectedImage(image);
        setCurrentImageIndex(displayImages.findIndex(img => img.id === image.id));
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        const newIndex = direction === 'next' 
            ? (currentImageIndex + 1) % displayImages.length
            : (currentImageIndex - 1 + displayImages.length) % displayImages.length;
        
        setCurrentImageIndex(newIndex);
        setSelectedImage(displayImages[newIndex]);
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
            <section className={`bg-white py-5 ${className}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            IMAGE GALLERY
                        </h2>
                    </div>

                    {/* Gallery Grid - Single Row of 6 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
                        {displayImages.map((image) => (
                            <div 
                                key={image.id}
                                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-48"
                                onClick={() => openLightbox(image)}
                            >
                                {/* Image */}
                                <img 
                                    src={`/storage/${image.image_path}`} 
                                    alt={image.alt_text || image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Gradient Overlay - Only visible on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* View Icon - Only visible on hover */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                        <Eye className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                
                                {/* Content - Only visible on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                                    <h3 className="text-sm font-bold text-center line-clamp-2">
                                        {image.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Gallery Button */}
                    {showViewAll && images.length > showCount && (
                        <div className="text-center">
                            <Link
                                href="/gallery"
                                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <Camera className="h-5 w-5 mr-2" />
                                View All Gallery
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

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
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {displayImages.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
