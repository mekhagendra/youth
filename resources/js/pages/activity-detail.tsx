import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin, Users, User, ArrowLeft, Share2, Facebook, Twitter, Mail } from 'lucide-react';
import PublicHeader from '@/components/public-header';

interface Activity {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
    content: string;
    category: 'workshop' | 'seminar' | 'training' | 'community' | 'awareness';
    participants?: number;
    organizer: string;
    status: 'upcoming' | 'ongoing' | 'completed';
}

interface ActivityDetailProps {
    activityId: string;
}

export default function ActivityDetail({ activityId }: ActivityDetailProps) {
    const [activity, setActivity] = useState<Activity | null>(null);
    const [loading, setLoading] = useState(true);

    // Sample activity data - this would normally come from API/database
    const activities: Activity[] = [
        {
            id: 1,
            title: "Youth Leadership Workshop",
            description: "Empowering young leaders with essential skills for community development and social change.",
            image: "/images/aboutusImage.jpg",
            location: "Kathmandu Community Center",
            date: "2025-10-20",
            content: `
                <h2>Youth Leadership Workshop</h2>
                <p>Join us for an intensive workshop designed to develop leadership skills among young people. This workshop will cover various aspects of leadership including communication, team building, project management, and community engagement.</p>
                
                <h3>What You'll Learn:</h3>
                <ul>
                    <li>Effective communication techniques</li>
                    <li>Team building and collaboration</li>
                    <li>Project planning and execution</li>
                    <li>Community outreach strategies</li>
                    <li>Conflict resolution</li>
                </ul>
                
                <h3>Who Should Attend:</h3>
                <p>This workshop is ideal for young people aged 18-30 who are interested in developing their leadership skills and making a positive impact in their communities.</p>
                
                <h3>Registration:</h3>
                <p>Registration is free but limited to 50 participants. Please register early to secure your spot.</p>
                
                <h3>Workshop Schedule:</h3>
                <ul>
                    <li><strong>9:00 AM - 10:30 AM:</strong> Opening ceremony and introductions</li>
                    <li><strong>10:45 AM - 12:15 PM:</strong> Communication skills session</li>
                    <li><strong>1:15 PM - 2:45 PM:</strong> Team building activities</li>
                    <li><strong>3:00 PM - 4:30 PM:</strong> Project management workshop</li>
                    <li><strong>4:30 PM - 5:00 PM:</strong> Closing remarks and certificates</li>
                </ul>
                
                <h3>What to Bring:</h3>
                <p>Please bring a notebook, pen, and your enthusiasm to learn and network with fellow participants.</p>
                
                <h3>Contact Information:</h3>
                <p>For more information, please contact us at info@youthinitiative.np or call +977-1-123456.</p>
            `,
            category: "workshop",
            participants: 45,
            organizer: "Youth Initiative Nepal",
            status: "upcoming"
        },
        {
            id: 2,
            title: "Digital Literacy Training",
            description: "Teaching digital skills to bridge the technology gap in rural communities.",
            image: "/images/backgroundImage.jpg",
            location: "Pokhara Technology Hub",
            date: "2025-10-25",
            content: `
                <h2>Digital Literacy Training Program</h2>
                <p>Our comprehensive digital literacy training program aims to equip participants with essential computer and internet skills needed in today's digital world.</p>
                
                <h3>Program Highlights:</h3>
                <ul>
                    <li>Basic computer operations</li>
                    <li>Internet navigation and safety</li>
                    <li>Email and communication tools</li>
                    <li>Online banking and e-commerce</li>
                    <li>Social media best practices</li>
                </ul>
                
                <h3>Duration:</h3>
                <p>The training will run for 5 days, with 4 hours of instruction each day.</p>
                
                <h3>Certification:</h3>
                <p>Participants will receive a certificate of completion upon successfully finishing the program.</p>
                
                <h3>Requirements:</h3>
                <p>No prior computer experience is required. All materials and equipment will be provided.</p>
                
                <h3>Career Benefits:</h3>
                <p>This training will help participants improve their job prospects and access online opportunities for income generation.</p>
            `,
            category: "training",
            participants: 30,
            organizer: "Digital Nepal Initiative",
            status: "upcoming"
        }
    ];

    useEffect(() => {
        // Simulate API call to fetch activity details
        const fetchActivity = async () => {
            setLoading(true);
            
            // Find activity by ID
            const foundActivity = activities.find(act => act.id === parseInt(activityId));
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setActivity(foundActivity || null);
            setLoading(false);
        };

        fetchActivity();
    }, [activityId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'workshop':
                return 'bg-blue-100 text-blue-800';
            case 'seminar':
                return 'bg-green-100 text-green-800';
            case 'training':
                return 'bg-purple-100 text-purple-800';
            case 'community':
                return 'bg-orange-100 text-orange-800';
            case 'awareness':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-green-100 text-green-800';
            case 'ongoing':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const shareActivity = (platform: string) => {
        const url = window.location.href;
        const title = activity?.title || 'Youth Initiative Activity';
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this activity: ${url}`)}`;
                break;
        }
    };

    if (loading) {
        return (
            <>
                <Head title="Loading... - Youth Initiative Nepal" />
                <PublicHeader />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading activity details...</p>
                    </div>
                </div>
            </>
        );
    }

    if (!activity) {
        return (
            <>
                <Head title="Activity Not Found - Youth Initiative Nepal" />
                <PublicHeader />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Activity Not Found</h1>
                        <p className="text-gray-600 mb-8">The activity you're looking for doesn't exist or has been removed.</p>
                        <Link
                            href="/activities"
                            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Activities
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`${activity.title} - Youth Initiative Nepal`} />
            <PublicHeader />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Image */}
                <div className="relative h-96 overflow-hidden">
                    <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Back Button */}
                    <div className="absolute top-6 left-6">
                        <Link
                            href="/activities"
                            className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Activities
                        </Link>
                    </div>

                    {/* Share Buttons */}
                    <div className="absolute top-6 right-6">
                        <div className="flex items-center space-x-2">
                            <span className="text-white text-sm font-medium mr-2">Share:</span>
                            <button
                                onClick={() => shareActivity('facebook')}
                                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
                            >
                                <Facebook className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => shareActivity('twitter')}
                                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
                            >
                                <Twitter className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => shareActivity('email')}
                                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
                            >
                                <Mail className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Activity Info Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(activity.category)}`}>
                                {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activity.status)}`}>
                                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">{activity.title}</h1>
                        <p className="text-white/90 text-lg">{activity.description}</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div 
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: activity.content }}
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Activity Details Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Activity Details</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Calendar className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Date</p>
                                            <p className="text-gray-600">{formatDate(activity.date)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <MapPin className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Location</p>
                                            <p className="text-gray-600">{activity.location}</p>
                                        </div>
                                    </div>

                                    {activity.participants && (
                                        <div className="flex items-start space-x-3">
                                            <Users className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-800">Participants</p>
                                                <p className="text-gray-600">{activity.participants} people</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start space-x-3">
                                        <User className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Organizer</p>
                                            <p className="text-gray-600">{activity.organizer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Related Activities */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Related Activities</h3>
                                <div className="space-y-4">
                                    {activities
                                        .filter(act => act.id !== activity.id && act.category === activity.category)
                                        .slice(0, 2)
                                        .map((relatedActivity) => (
                                            <Link
                                                key={relatedActivity.id}
                                                href={`/activities/${relatedActivity.id}`}
                                                className="block hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                                            >
                                                <h4 className="font-medium text-gray-800 mb-1">{relatedActivity.title}</h4>
                                                <p className="text-sm text-gray-600">{formatDate(relatedActivity.date)}</p>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}