import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Supporter {
    id: number;
    name: string;
    logo: string;
}

export default function Supporter() {
    // Auto-sliding state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [slidesToShow, setSlidesToShow] = useState(1);

    // This would normally come from database/API
    const [supporters, setSupporters] = useState<Supporter[]>([
        {
            id: 1,
            name: "UNICEF Nepal",
            logo: "/images/aboutusImage.jpg" // Replace with actual logo path
        },
        {
            id: 2,
            name: "Government of Nepal",
            logo: "/images/backgroundImage.jpg" // Replace with actual logo path
        },
        {
            id: 3,
            name: "Mercy Corps",
            logo: "/images/aboutOurOrgImage.jpg" // Replace with actual logo path
        },
        {
            id: 4,
            name: "World Vision",
            logo: "/images/aboutOurOrgImage1.jpg" // Replace with actual logo path
        },
        {
            id: 5,
            name: "European Union",
            logo: "/images/aboutusImage.jpg" // Replace with actual logo path
        },
        {
            id: 6,
            name: "Local Corporate Partner",
            logo: "/images/backgroundImage.jpg" // Replace with actual logo path
        }
    ]);

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying || supporters.length <= slidesToShow) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const maxSlide = Math.max(0, supporters.length - slidesToShow);
                return prev >= maxSlide ? 0 : prev + 1;
            });
        }, 3000); // Auto-slide every 3 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, supporters.length, slidesToShow]);

    // Responsive slides to show
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1280) {
                setSlidesToShow(9); // xl screens - 9 supporters
            } else if (width >= 1024) {
                setSlidesToShow(6); // lg screens - 6 supporters
            } else if (width >= 768) {
                setSlidesToShow(4); // md screens - 4 supporters
            } else if (width >= 640) {
                setSlidesToShow(2); // sm screens - 2 supporters
            } else {
                setSlidesToShow(1); // xs screens - 1 supporter
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset slide when slidesToShow changes
    useEffect(() => {
        const maxSlide = Math.max(0, supporters.length - slidesToShow);
        if (currentSlide > maxSlide) {
            setCurrentSlide(0);
        }
    }, [slidesToShow, supporters.length, currentSlide]);

    const nextSlide = () => {
        const maxSlide = Math.max(0, supporters.length - slidesToShow);
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    };

    const prevSlide = () => {
        const maxSlide = Math.max(0, supporters.length - slidesToShow);
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    };

    const goToSlide = (index: number) => {
        const maxSlide = Math.max(0, supporters.length - slidesToShow);
        setCurrentSlide(Math.min(index, maxSlide));
    };

    // Get category icon
    return (
        <section className="bg-white py-5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-5">
                    <div className="flex justify-center mb-4">
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        OUR SUPPORTERS
                    </h2>
                </div>

                {/* Supporters Carousel */}
                <div className="relative mb-5">
                    <div 
                        className="overflow-hidden rounded-xl mx-4 md:mx-8"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
                                width: supporters.length <= slidesToShow 
                                    ? '100%' 
                                    : `${(supporters.length / slidesToShow) * 100}%`
                            }}
                        >
                            {supporters.map((supporter) => (
                                <div 
                                    key={supporter.id}
                                    className="group relative  hover:shadow-xl transition-all duration-300 hover:border-blue-200 mx-0.5 sm:mx-1 md:mx-2"
                                    style={{ 
                                        minWidth: `${100 / slidesToShow}%`,
                                        flex: `0 0 ${100 / slidesToShow}%`
                                    }}
                                >
                                    {/* Supporter Logo */}
                                    <div className="relative overflow-hidden rounded-md mb-2 md:mb-4">
                                        <div className="w-full h-12 sm:h-16 md:h-24 min-h-[48px] sm:min-h-[64px] md:min-h-[96px] flex items-center justify-center">
                                            <img 
                                                src={supporter.logo} 
                                                alt={supporter.name}
                                                className="max-w-full max-h-full min-h-[200px] sm:min-h-[200px] md:min-h-[200px] object-contain transition-transform duration-300 group-hover:scale-110"
                                                style={{ width: '100%', maxHeight: 'auto', minHeight: '40px' }}
                                            />
                                        </div>
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        {/* Supporter Info - Only visible on hover */}
                                        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="text-center p-2 w-full">
                                                <h3 className="text-white font-medium text-xs sm:text-sm md:text-base leading-tight text-center line-clamp-2">
                                                    {supporter.name}
                                                </h3>
                                                <div className="w-8 h-0.5 bg-blue-400 mx-auto mt-1 opacity-80"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {supporters.length > slidesToShow && (
                        <div className="flex justify-center mt-4 md:mt-6 space-x-2">
                            {Array.from({ length: Math.max(1, supporters.length - slidesToShow + 1) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide 
                                            ? 'bg-blue-600 scale-125' 
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    )}


                    {supporters.length > slidesToShow && (
                        <div className="absolute top-2 md:top-4 right-8 md:right-12 bg-white/90 rounded-full p-1 md:p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
