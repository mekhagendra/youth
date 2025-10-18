import React, { useState, useEffect } from 'react';

interface Supporter {
    id: number;
    name: string;
    src: string;
}

const Supporter = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(1);
    const [supporters] = useState<Supporter[]>([
        { id: 1, name: "World Bank", src: "/images/aboutOurOrgImage.jpg" },
        { id: 2, name: "UNICEF Nepal", src: "/images/aboutOurOrgImage1.jpg" },
        { id: 3, name: "UNDP", src: "/images/backgroundImage.jpg" },
        { id: 4, name: "Save the Children", src: "/images/aboutusImage.jpg" },
        { id: 5, name: "Plan International", src: "/images/aboutOurOrgImage.jpg" },
        { id: 6, name: "Mercy Corps", src: "/images/aboutOurOrgImage1.jpg" }
    ]);

    // Set slides to show based on screen size
    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth >= 1024) {
                setSlidesToShow(4);
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(3);
            } else if (window.innerWidth >= 640) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const maxSlide = Math.max(0, supporters.length - slidesToShow);
                return prev >= maxSlide ? 0 : prev + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [supporters.length, slidesToShow]);

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Our Supporters & Partners
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We're grateful for the support of organizations that share our vision 
                        of empowering youth across Nepal.
                    </p>
                </div>

                <div className="relative overflow-hidden">
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
                                className="flex-shrink-0 px-4 group"
                                style={{ width: `${100 / supporters.length}%` }}
                            >
                                <div className="relative bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 h-32 flex items-center justify-center overflow-hidden">
                                    {/* Supporter Logo */}
                                    <img 
                                        src={supporter.src}
                                        alt={supporter.name}
                                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                                    />
                                    
                                    {/* Hover Overlay with Name */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                                        <div className="text-center p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-white font-medium text-xs sm:text-sm md:text-base line-clamp-2 mb-1">
                                                {supporter.name}
                                            </h3>
                                            <div className="w-8 h-0.5 bg-blue-400 mx-auto"></div>
                                        </div>
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
            </div>
        </section>
    );
};

export default Supporter;
