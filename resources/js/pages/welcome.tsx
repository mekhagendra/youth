import { type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import Message from '@/components/message';
import Activity from '@/components/activity';
import About from '@/components/about';
import Gallery from '@/components/gallery';
import { Button } from '@/components/ui/button';
import { 
    Heart,
    UserPlus
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Supporter from '@/components/supporter';
import Footer from '@/components/footer';

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

interface Activity {
    id: number;
    title: string;
    description: string;
    content: string | null;
    image_path: string | null;
    location: string;
    date: string;
    category: 'workshop' | 'seminar' | 'training' | 'community' | 'awareness';
    participants: number | null;
    organizer: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface WelcomeProps extends SharedData {
    galleryImages: GalleryImage[];
    activities: Activity[];
}

export default function Welcome() {
    const { auth, galleryImages, activities } = usePage<WelcomeProps>().props;
    
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
            <div className="pt-32 bg-gray-100 min-h-screen">
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
                    
                </section>
                <About />

                {/* Journey Section */}
                <section className="bg-gray-100 ">
                    <div className="container w-full mx-auto px-4 py-5">
                        {/* Small Screen Image (Mobile/Tablet) */}
                        <div className="block md:hidden">
                            <img 
                                src="/images/youthJourney.jpg" 
                                alt="Youth Initiative Mobile Journey" 
                                className="w-full h-auto"
                            />
                        </div>
                        
                        {/* Medium+ Screen Image (Desktop) */}
                        <div className="hidden md:block">
                            <img 
                                src="/images/youthJourney.jpg" 
                                alt="Youth Initiative Desktop Journey" 
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </section>

                <Message />

                <Gallery images={galleryImages} showCount={6} showViewAll={true} />

                <Activity activities={activities} showCount={4} showViewAll={true} />

                <Supporter />

                {/* CTA Section */}
                <section className="bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold text-green-700 mb-6">
                            Make a Difference, Support Those in Need.
                        </h2>
                        <p className="text-xl text-black font-bold mb-8 max-w-3xl mx-auto">
                            Be part of a movement that empowers young voices, drives social change, and 
                            shapes a better future for all. Whether you're passionate about advocacy, 
                            community service, or leadership—your time and energy can create real impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/members/signup">
                                <Button 
                                    size="lg"
                                    className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg text-lg flex items-center space-x-2"
                                >
                                    <UserPlus className="h-5 w-5" />
                                    <span>Join as Member</span>
                                </Button>
                            </Link>
                            <Link href="/opportunities/volunteer">
                                <Button 
                                    size="lg"
                                    variant="outline"
                                    className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg text-lg flex items-center space-x-2"
                                >
                                    <Heart className="h-5 w-5" />
                                    <span>Join as Volunteer</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}