import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Message = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const messages = [
        {
            id: 1,
            text: "Youth Initiative has transformed my perspective on community service. Through their programs, I've gained leadership skills and confidence to make a real difference.",
            author: "Priya Sharma",
            role: "Youth Leader",
            image: "/images/aboutOurOrgImage.jpg"
        },
        {
            id: 2,
            text: "The digital literacy program opened doors I never knew existed. Now I'm helping other youth in my community learn technology skills.",
            author: "Rajesh Tamang",
            role: "Program Graduate",
            image: "/images/aboutOurOrgImage1.jpg"
        },
        {
            id: 3,
            text: "Being part of Youth Initiative's community outreach has shown me the power of collective action. We're creating lasting change together.",
            author: "Sunita Thapa",
            role: "Volunteer Coordinator",
            image: "/images/backgroundImage.jpg"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % messages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [messages.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % messages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + messages.length) % messages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Voices of Change
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Hear from the youth who are making a difference in their communities
                        through our programs and initiatives.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Message Carousel */}
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {messages.map((message) => (
                                <div key={message.id} className="w-full flex-shrink-0">
                                    <div className="p-12 text-center">
                                        {/* Quote Icon */}
                                        <div className="flex justify-center mb-6">
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Quote className="h-8 w-8 text-blue-600" />
                                            </div>
                                        </div>

                                        {/* Message Text */}
                                        <blockquote className="text-xl text-gray-700 leading-relaxed mb-8 italic">
                                            "{message.text}"
                                        </blockquote>

                                        {/* Author Info */}
                                        <div className="flex items-center justify-center space-x-4">
                                            <img 
                                                src={message.image}
                                                alt={message.author}
                                                className="w-16 h-16 rounded-full object-cover border-4 border-blue-200"
                                            />
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-800 text-lg">
                                                    {message.author}
                                                </div>
                                                <div className="text-blue-600 text-sm">
                                                    {message.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-600" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {messages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
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

export default Message;
