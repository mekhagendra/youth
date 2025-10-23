import React, { useState, useEffect } from 'react';

interface Supporter {
    id: number;
    name: string;
    src: string;
    website_url?: string;
}

const Supporter: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(9);
    const [supporters, setSupporters] = useState<Supporter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch supporters from API
    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/supporters');
                if (!response.ok) {
                    throw new Error('Failed to fetch supporters');
                }
                const data = await response.json();
                setSupporters(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching supporters:', err);
                // Fallback to empty array if API fails
                setSupporters([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSupporters();
    }, []);

    // Update slides to show based on screen size
    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(2); // Mobile: 2 images
            } else {
                setSlidesToShow(9); // Desktop: 9 images
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    // Auto-slide functionality
    useEffect(() => {
        if (supporters.length === 0) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const maxSlide = Math.max(0, supporters.length - slidesToShow);
                return prev >= maxSlide ? 0 : prev + 1;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [supporters.length, slidesToShow]);

    // Don't render if no supporters and not loading
    if (!loading && supporters.length === 0 && !error) {
        return null;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Supporters</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We are grateful for the support of these amazing organizations that help us make a difference in our community.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading supporters...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-12">
                        <p className="text-red-600 mb-4">Failed to load supporters: {error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Supporters Content */}
                {!loading && !error && supporters.length > 0 && (

                <div className="relative overflow-hidden">
                    {/* Previous Arrow */}
                    <button 
                        onClick={() => setCurrentSlide(prev => prev > 0 ? prev - 1 : Math.max(0, supporters.length - slidesToShow))}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                    >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    {/* Next Arrow */}
                    <button 
                        onClick={() => setCurrentSlide(prev => {
                            const maxSlide = Math.max(0, supporters.length - slidesToShow);
                            return prev >= maxSlide ? 0 : prev + 1;
                        })}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                    >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ 
                            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
                            width: `${(supporters.length / slidesToShow) * 100}%`
                        }}
                    >
                        {supporters.map((supporter) => (
                            <div 
                                key={supporter.id}
                                className="flex-shrink-0 px-3 md:px-6 lg:px-8 group relative"
                                style={{ width: `${100 / supporters.length}%` }}
                            >
                                <div className="relative h-16 md:h-20 lg:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                                    {/* Supporter Logo */}
                                    <img 
                                        src={supporter.src}
                                        alt={supporter.name}
                                        className="max-h-12 md:max-h-16 lg:max-h-20 w-auto max-w-[60px] md:max-w-[90px] lg:max-w-[120px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 cursor-pointer opacity-70 group-hover:opacity-100"
                                        title={supporter.name}
                                    />
                                    
                                    {/* Attractive Name Overlay within Image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                                        <div className="text-center pb-2 px-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-white/20">
                                                <span className="text-xs md:text-sm font-semibold text-gray-800 whitespace-nowrap">
                                                    {supporter.name}
                                                </span>
                                            </div>
                                            {/* Decorative elements */}
                                            <div className="flex justify-center mt-1 space-x-1">
                                                <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                                                <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                                <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle shine effect on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.max(1, supporters.length - slidesToShow + 1) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    index === currentSlide 
                                        ? 'bg-blue-600 scale-125' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                )}
            </div>
        </section>
    );
};

export default Supporter;
