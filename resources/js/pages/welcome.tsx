import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import { Button } from '@/components/ui/button';
import { 
    Users, 
    Target, 
    TrendingUp,
    Heart,
    UserPlus,
    ArrowRight,
    CheckCircle,
    Star,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    
    // Carousel state and logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    
    const images = [
        {
            src: "/images/aboutOurOrgImage.jpg",
            alt: "Youth Empowerment Program",
            title: "Empowering Young Minds",
            description: "Building tomorrow's leaders today"
        },
        {
            src: "/images/aboutOurOrgImage1.jpg",
            alt: "Community Outreach",
            title: "Community Impact",
            description: "Creating positive change together"
        },
        {
            src: "/images/backgroundImage.jpg",
            alt: "Educational Programs",
            title: "Educational Excellence",
            description: "Learning opportunities for all"
        },
        {
            src: "/images/aboutusImage.jpg",
            alt: "Youth Activities",
            title: "Youth Activities",
            description: "Engaging programs and workshops"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, images.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <Head title="Welcome - Youth Initiative">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            
            {/* Header */}
            <PublicHeader user={auth.user} />
            
            {/* Main Content */}
            <div className="pt-32 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                                    Empowering Youth.
                                    <span className="text-blue-600 block">Shaping Tomorrow.</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Youth Initiative believes that the investment on youth today will certainly 
                                    contribute towards the holistic development of young people in micro, mezzo and 
                                    macro level both in the present and the future.
                                </p>
                            </div>
                            
                            {/* Stats */}
                            <div className="flex flex-wrap gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">$1,284,528</div>
                                    <div className="text-sm text-gray-600">Total Donations</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">12,460</div>
                                    <div className="text-sm text-gray-600">Youth Placed in STEM</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Hero Image Carousel */}
                        <div className="relative">
                            <div 
                                className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl group"
                                onMouseEnter={() => setIsAutoPlaying(false)}
                                onMouseLeave={() => setIsAutoPlaying(true)}
                            >
                                {/* Images Container */}
                                <div className="relative w-full h-full">
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                                                index === currentSlide 
                                                    ? 'opacity-100 scale-100 translate-x-0' 
                                                    : index === (currentSlide + 1) % images.length
                                                    ? 'opacity-0 scale-110 translate-x-full'
                                                    : 'opacity-0 scale-90 -translate-x-full'
                                            }`}
                                        >
                                            <img 
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    console.error(`Failed to load image: ${image.src}`);
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                                onLoad={() => {
                                                    console.log(`Successfully loaded: ${image.src}`);
                                                }}
                                            />
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            
                                            {/* Content Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                                                <p className="text-sm opacity-90">{image.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                index === currentSlide 
                                                    ? 'bg-white scale-125' 
                                                    : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Auto-play indicator */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl transform rotate-3" />
                            <div className="absolute -z-20 top-8 left-8 w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl transform -rotate-3 opacity-60" />
                        </div>
                    </div>
                    <br />
                    <Button 
                        size="lg"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg text-lg flex items-center mx-auto"
                    >
                        <span>Learn More</span>
                    </Button>
                </section>

                {/* About Section */}
                <section className="bg-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                We help in Youth's capacity development.
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Youth Initiative (YI) is a youth organization working for the capacity 
                                development of youths in Nepal. Established in 1999, YI was formally 
                                registered with the District Administration Office, Kathmandu in April 2001.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Inform */}
                            <div className="text-center p-8 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Inform</h3>
                                <p className="text-gray-600">
                                    Inform young people about the global, national and local issues and 
                                    concerns that affects their everyday living.
                                </p>
                            </div>
                            
                            {/* Empower */}
                            <div className="text-center p-8 bg-green-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <TrendingUp className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Empower</h3>
                                <p className="text-gray-600">
                                    Empower young people by organizing them into a group of critical mass, 
                                    increasing their access and control over resources.
                                </p>
                            </div>
                            
                            {/* Involve */}
                            <div className="text-center p-8 bg-purple-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Target className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Involve</h3>
                                <p className="text-gray-600">
                                    Involve young people by increasing youth representation in governance of 
                                    all political and social institutions at national and sub national level.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Journey Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Our Journey So Far
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Since its inception in 1999, Youth Initiative has been at the forefront of 
                            youth empowerment in Nepal. Over the years, we have successfully implemented 
                            numerous programs and initiatives that have positively impacted the lives of 
                            thousands of young individuals across the country.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Milestone 1 */}
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">1999</h3>
                            </div>
                            <p className="text-gray-600">
                                Founded with a mission to empower youth and foster leadership skills.
                            </p>
                        </div>
                        
                        {/* Milestone 2 */}
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center mr-4">
                                    <Star className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">2005</h3>
                            </div>
                            <p className="text-gray-600">
                                Launched the first nationwide youth leadership program, reaching over 5,000 youths.
                            </p>
                        </div>
                        
                        {/* Milestone 3 */}
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4">
                                    <Users className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">2020</h3>
                            </div>
                            <p className="text-gray-600">
                                Expanded programs to include digital literacy and mental health awareness.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Make a Difference, Support Those in Need.
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Be part of a movement that empowers young voices, drives social change, and 
                            shapes a better future for all. Whether you're passionate about advocacy, 
                            community service, or leadership—your time and energy can create real impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg flex items-center space-x-2"
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Join as Member</span>
                            </Button>
                            <Button 
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg flex items-center space-x-2"
                            >
                                <Heart className="h-5 w-5" />
                                <span>Join as Volunteer</span>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}