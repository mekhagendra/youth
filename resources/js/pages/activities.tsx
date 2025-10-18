import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin, Eye, ArrowRight, Search, Filter } from 'lucide-react';
import PublicHeader from '@/components/public-header';

interface Activity {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
    content?: string;
    category: 'workshop' | 'seminar' | 'training' | 'community' | 'awareness';
    participants?: number;
    organizer: string;
    status: 'upcoming' | 'ongoing' | 'completed';
}

export default function Activities() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    // Sample activity data - this would normally come from API/database
    const [activities] = useState<Activity[]>([
        {
            id: 1,
            title: "Youth Leadership Workshop",
            description: "Empowering young leaders with essential skills for community development and social change.",
            image: "/images/aboutusImage.jpg",
            location: "Kathmandu Community Center",
            date: "2025-10-20",
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
            category: "training",
            participants: 30,
            organizer: "Digital Nepal Initiative",
            status: "upcoming"
        },
        {
            id: 3,
            title: "Community Health Awareness Campaign",
            description: "Promoting health and wellness practices in local communities through education and outreach.",
            image: "/images/aboutOurOrgImage.jpg",
            location: "Chitwan Rural Communities",
            date: "2025-11-01",
            category: "awareness",
            participants: 500,
            organizer: "Health for All Initiative",
            status: "upcoming"
        },
        {
            id: 4,
            title: "Environmental Conservation Seminar",
            description: "Discussing climate change impacts and sustainable practices for environmental protection.",
            image: "/images/aboutOurOrgImage1.jpg",
            location: "Lalitpur Convention Center",
            date: "2025-11-05",
            category: "seminar",
            participants: 150,
            organizer: "Green Future Nepal",
            status: "upcoming"
        },
        {
            id: 5,
            title: "Women Empowerment Workshop",
            description: "Supporting women's rights and economic empowerment through skill development programs.",
            image: "/images/aboutusImage.jpg",
            location: "Bhaktapur Women's Center",
            date: "2025-11-10",
            category: "workshop",
            participants: 75,
            organizer: "Women's Rights Organization",
            status: "upcoming"
        },
        {
            id: 6,
            title: "Youth Entrepreneurship Fair",
            description: "Showcasing innovative business ideas and connecting young entrepreneurs with investors.",
            image: "/images/backgroundImage.jpg",
            location: "Kathmandu Exhibition Center",
            date: "2025-11-15",
            category: "community",
            participants: 200,
            organizer: "Startup Nepal",
            status: "upcoming"
        },
        {
            id: 7,
            title: "Rural Development Workshop",
            description: "Training local leaders in sustainable development practices for rural communities.",
            image: "/images/aboutOurOrgImage.jpg",
            location: "Dhading District Office",
            date: "2025-09-15",
            category: "workshop",
            participants: 60,
            organizer: "Rural Development Initiative",
            status: "completed"
        },
        {
            id: 8,
            title: "Technology Skills Bootcamp",
            description: "Intensive coding and web development training for unemployed youth.",
            image: "/images/backgroundImage.jpg",
            location: "Kathmandu Tech Park",
            date: "2025-09-20",
            category: "training",
            participants: 40,
            organizer: "Tech Education Nepal",
            status: "completed"
        }
    ]);

    // Filter activities based on search and filters
    const filteredActivities = activities.filter(activity => {
        const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            activity.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
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

    return (
        <>
            <Head title="Activities - Youth Initiative Nepal" />
            <PublicHeader />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">Activities</h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Search and Filter Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search activities..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="training">Training</option>
                                    <option value="community">Community</option>
                                    <option value="awareness">Awareness</option>
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                >
                                    <option value="all">All Status</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            {/* Results Count */}
                            <div className="flex items-center justify-center md:justify-start">
                                <span className="text-gray-600 font-medium">
                                    {filteredActivities.length} Activities Found
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Activities Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredActivities.map((activity) => (
                            <div 
                                key={activity.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                {/* Activity Image */}
                                <div className="relative overflow-hidden h-56">
                                    <img 
                                        src={activity.image} 
                                        alt={activity.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                            {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Activity Content */}
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2">
                                        {activity.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {activity.description}
                                    </p>

                                    {/* Activity Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                                            <span className="truncate">{activity.location}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                                            <span>{formatDate(activity.date)}</span>
                                        </div>
                                        {activity.participants && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <span className="font-medium">Participants: {activity.participants}</span>
                                            </div>
                                        )}
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium">Organizer: </span>
                                            <span>{activity.organizer}</span>
                                        </div>
                                    </div>

                                    {/* View Details Button */}
                                    <Link
                                        href={`/activities/${activity.id}`}
                                        className="inline-flex items-center w-full justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                        <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredActivities.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <Search className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Activities Found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}