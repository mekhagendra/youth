import React from 'react';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin, Users, Facebook, Twitter, Mail } from 'lucide-react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';

interface Activity {
    id: number;
    title: string;
    description: string;
    content: string | null;
    date: string;
    location: string;
    participants: number | null;
    image: string;
    category: string;
    organizer: string;
    status: string;
}

interface ActivityDetailProps {
    activity: Activity;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ activity }) => {

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(activity.title);
        
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
            <Head title={`${activity.title} - Youth Initiative`} />
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
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                        {activity.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="bg-white rounded-xl p-8 shadow-sm">
                                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                    {activity.title}
                                </h1>
                                
                                <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-5 w-5" />
                                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-5 w-5" />
                                        <span>{activity.location}</span>
                                    </div>
                                    {activity.participants && (
                                        <div className="flex items-center space-x-2">
                                            <Users className="h-5 w-5" />
                                            <span>{activity.participants} Participants</span>
                                        </div>
                                    )}
                                </div>

                                <div className="prose max-w-none">
                                    <div className="text-lg text-gray-700 leading-relaxed mb-8">
                                        <div dangerouslySetInnerHTML={{ __html: activity.description }} />
                                    </div>

                                    {activity.content && (
                                        <div className="text-gray-700 leading-relaxed">
                                            <div dangerouslySetInnerHTML={{ __html: activity.content }} />
                                        </div>
                                    )}
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
                                        <div className="font-medium text-gray-800">{activity.organizer}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Category</div>
                                        <div className="font-medium text-gray-800">{activity.category}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Date</div>
                                        <div className="font-medium text-gray-800">
                                            {new Date(activity.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Location</div>
                                        <div className="font-medium text-gray-800">{activity.location}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Status</div>
                                        <div className="font-medium text-gray-800">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                                activity.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                                activity.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                            </span>
                                        </div>
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