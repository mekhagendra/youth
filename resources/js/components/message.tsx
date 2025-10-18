import { Quote, Users, Heart, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface TeamMember {
    name: string;
    position: string;
    message: string;
    image: string;
    department: string;
}

export default function Message() {
    // Auto-sliding state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const teamMessages: TeamMember[] = [
        {
            name: "Alisha Dhungana",
            position: "Executive Director",
            message: "At Youth Initiative, we believe that every young person has the potential to create meaningful change. Our commitment is to provide the resources, guidance, and opportunities necessary to unlock that potential and transform communities across Nepal.",
            image: "/images/aboutusImage.jpg",
            department: "Leadership"
        },
        {
            name: "Team member",
            position: "Program Manager",
            message: "Working with young leaders across Nepal has shown me the incredible resilience and innovation that exists within our communities. We are dedicated to amplifying these voices and creating sustainable programs that make a lasting impact.",
            image: "/images/aboutOurOrgImage.jpg",
            department: "Programs"
        },
        {
            name: "Team Member",
            position: "Community Outreach Coordinator",
            message: "Building bridges between youth and communities is at the heart of what we do. Through collaborative initiatives and grassroots engagement, we're fostering a generation of changemakers who understand the power of collective action.",
            image: "/images/backgroundImage.jpg",
            department: "Outreach"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % teamMessages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, teamMessages.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % teamMessages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + teamMessages.length) % teamMessages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="bg-gray-50 py-5">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Message from Our Team
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Empowering youth, creating change together.
                    </p>
                </div>

                <div className="mb-16 relative">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hover:bg-green-700 text-green-700 hover:text-white p-3 rounded-full transition-all duration-300"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hover:bg-green-700 text-green-700 hover:text-white p-3 rounded-full transition-all duration-300"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    <div 
                        className="bg-white rounded-2xl shadow-lg overflow-hidden group mx-12"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        <div className="relative min-h-fit md:min-h-[400px]">
                            {teamMessages.map((member, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                                        index === currentSlide 
                                            ? 'opacity-100 translate-x-0' 
                                            : index === (currentSlide + 1) % teamMessages.length
                                            ? 'opacity-0 translate-x-full'
                                            : 'opacity-0 -translate-x-full'
                                    }`}
                                >
                                    {/* Mobile: Stacked Layout, Desktop: Side-by-side */}
                                    <div className="flex flex-col md:grid md:grid-cols-2 h-full">
                                        {/* Image Section */}
                                        <div className="relative overflow-hidden min-h-[200px] md:min-h-[400px]">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full min-h-[200px] md:min-h-[400px] object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                                            <div className="absolute top-4 left-4">
                                                <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                                                    {member.department}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-4 md:p-8 flex flex-col justify-center min-h-fit md:min-h-[400px] bg-white">
                                            <div className="flex justify-start mb-4">
                                                <Quote className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                                            </div>
                                            <h4 className="font-bold text-gray-800 text-xl md:text-2xl mb-2">
                                                {member.name}
                                            </h4>
                                            <p className="text-blue-600 font-medium text-base md:text-lg mb-4 md:mb-6">
                                                {member.position}
                                            </p>
                                            <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed italic">
                                                "{member.message}"
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {teamMessages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide 
                                            ? 'bg-blue-600 scale-125' 
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
