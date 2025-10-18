import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin, Users, Facebook, Twitter, Mail } from 'lucide-react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';

interface Activity {
    id: number;
    title: string;
    shortDescription: string;
    fullDescription: string;
    date: string;
    location: string;
    participants: number;
    image: string;
    category: string;
    organizer: string;
    objectives: string[];
    outcomes: string[];
    gallery?: string[];
}

interface ActivityDetailProps {
    id: string;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ id }) => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    useEffect(() => {
        // Static activities data
        const activities: Activity[] = [
            {
                id: 1,
                title: "Youth Leadership Summit 2024",
                shortDescription: "Empowering tomorrow's leaders through innovative workshops and networking opportunities.",
                fullDescription: "Join us for an inspiring day of leadership development, skill-building workshops, and networking with like-minded youth from across Nepal. This summit brings together young change-makers to share ideas, learn from experts, and develop the skills needed to lead positive change in their communities.",
                date: "2024-03-15",
                location: "Kathmandu Convention Center",
                participants: 150,
                image: "/images/aboutOurOrgImage.jpg",
                category: "Leadership Development",
                organizer: "Youth Initiative Nepal",
                objectives: [
                    "Develop leadership skills among young people",
                    "Create networking opportunities for youth leaders",
                    "Inspire action towards community development",
                    "Share best practices in youth engagement"
                ],
                outcomes: [
                    "150+ youth participated from 15 districts",
                    "5 new youth-led initiatives launched",
                    "Community action plans developed",
                    "Strong network of young leaders established"
                ]
            },
            {
                id: 2,
                title: "Digital Skills Training Workshop",
                shortDescription: "Building digital literacy and technical skills for the modern workforce.",
                fullDescription: "In today's digital age, having strong technical skills is essential. Our comprehensive digital skills workshop covers everything from basic computer literacy to advanced digital marketing techniques, preparing young people for the modern job market.",
                date: "2024-02-28",
                location: "Youth Initiative Training Center",
                participants: 80,
                image: "/images/aboutOurOrgImage1.jpg",
                category: "Skills Development",
                organizer: "Youth Initiative Nepal",
                objectives: [
                    "Improve digital literacy among youth",
                    "Provide practical technical skills training",
                    "Enhance employability of participants",
                    "Bridge the digital divide"
                ],
                outcomes: [
                    "80 youth gained digital certification",
                    "60% of participants found employment",
                    "New digital learning center established",
                    "Follow-up support programs launched"
                ]
            }
        ];

        const activity = activities.find(a => a.id === parseInt(id));
        if (activity) {
            setSelectedActivity(activity);
        }
    }, [id]);

    if (!selectedActivity) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity Not Found</h2>
                    <p className="text-gray-600">The requested activity could not be found.</p>
                </div>
            </div>
        );
    }

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(selectedActivity.title);
        
        let shareUrl = '';
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=Check out this activity: ${url}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };

    return (
        <>
            <Head title={`${selectedActivity.title} - Youth Initiative`} />
            <PublicHeader user={null} />
            
            <div className="pt-32 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button 
                        onClick={() => window.history.back()}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Activities</span>
                    </button>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Hero Image */}
                            <div className="relative h-96 rounded-xl overflow-hidden">
                                <img 
                                    src={selectedActivity.image}
                                    alt={selectedActivity.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                        {selectedActivity.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="bg-white rounded-xl p-8 shadow-sm">
                                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                    {selectedActivity.title}
                                </h1>
                                
                                <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-5 w-5" />
                                        <span>{new Date(selectedActivity.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-5 w-5" />
                                        <span>{selectedActivity.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Users className="h-5 w-5" />
                                        <span>{selectedActivity.participants} Participants</span>
                                    </div>
                                </div>

                                <div className="prose max-w-none">
                                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                        {selectedActivity.fullDescription}
                                    </p>

                                    {/* Objectives */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Objectives</h3>
                                        <ul className="space-y-2">
                                            {selectedActivity.objectives.map((objective, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-gray-700">{objective}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Outcomes */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Outcomes & Impact</h3>
                                        <ul className="space-y-2">
                                            {selectedActivity.outcomes.map((outcome, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-gray-700">{outcome}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Activity Info Card */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-500">Organizer</div>
                                        <div className="font-medium text-gray-800">{selectedActivity.organizer}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Category</div>
                                        <div className="font-medium text-gray-800">{selectedActivity.category}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Date</div>
                                        <div className="font-medium text-gray-800">
                                            {new Date(selectedActivity.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Location</div>
                                        <div className="font-medium text-gray-800">{selectedActivity.location}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Share Card */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Share This Activity</h3>
                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => handleShare('facebook')}
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Facebook className="h-4 w-4" />
                                        <span className="text-sm">Facebook</span>
                                    </button>
                                    <button 
                                        onClick={() => handleShare('twitter')}
                                        className="flex-1 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Twitter className="h-4 w-4" />
                                        <span className="text-sm">Twitter</span>
                                    </button>
                                    <button 
                                        onClick={() => handleShare('email')}
                                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Mail className="h-4 w-4" />
                                        <span className="text-sm">Email</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ActivityDetail;