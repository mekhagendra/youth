import { useState } from 'react';
import { ArrowRight, Eye, Calendar, X, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Activity {
    id: number;
    title: string;
    description: string;
    content: string | null;
    image_path: string | null;
    location: string;
    date: string;
    category: string;
    participants: number | null;
    organizer: string;
    status: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface ActivityProps {
    activities?: Activity[];
    showCount?: number;
    showViewAll?: boolean;
    className?: string;
}

export default function Activity({ activities = [], showCount = 4, showViewAll = true, className = "" }: ActivityProps) {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const displayActivities = activities.slice(0, showCount);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const openModal = (activity: Activity) => {
        setSelectedActivity(activity);
    };

    const closeModal = () => {
        setSelectedActivity(null);
    };

    return (
        <>
            <section className={`bg-gray-50 py-5 ${className}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            OUR ACTIVITIES
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Join our diverse programs designed to empower youth and create positive social impact in communities across Nepal.
                        </p>
                    </div>

                    {displayActivities.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                {displayActivities.map((activity) => (
                                    <div 
                                        key={activity.id}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                                        onClick={() => openModal(activity)}
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            {activity.image_path ? (
                                                <img 
                                                    src={`/storage/${activity.image_path}`} 
                                                    alt={activity.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                    <Calendar className="h-16 w-16 text-white opacity-50" />
                                                </div>
                                            )}
                                            
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
                                                    <Eye className="h-6 w-6 text-white" />
                                                </div>
                                            </div>

                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800">
                                                    {activity.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                                                {activity.title}
                                            </h3>
                                            
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {activity.description}
                                            </p>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-gray-500">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    <span className="text-sm">{formatDate(activity.date)}</span>
                                                </div>
                                                <div className="flex items-center text-gray-500">
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                    <span className="text-sm">{activity.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Organized by {activity.organizer}
                                                    </p>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center group-hover:translate-x-2 transition-transform">
                                                    Learn More
                                                    <ArrowRight className="h-4 w-4 ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {showViewAll && activities.length > showCount && (
                                <div className="text-center">
                                    <Link
                                        href="/activities"
                                        className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <Calendar className="h-5 w-5 mr-2" />
                                        View All Activities
                                        <ArrowRight className="h-5 w-5 ml-2" />
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No activities available at the moment.</p>
                            <p className="text-gray-400 text-sm mt-2">Check back soon for upcoming events and programs!</p>
                        </div>
                    )}
                </div>
            </section>

            {selectedActivity && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        <div className="relative">
                            {selectedActivity.image_path ? (
                                <img 
                                    src={`/storage/${selectedActivity.image_path}`} 
                                    alt={selectedActivity.title}
                                    className="w-full h-64 object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <Calendar className="h-16 w-16 text-white opacity-50" />
                                </div>
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h2 className="text-2xl font-bold">{selectedActivity.title}</h2>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-96">
                            <h3 className="text-lg font-semibold mb-3">About This Activity</h3>
                            <p className="text-gray-600 mb-4">{selectedActivity.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <strong>Date:</strong> {formatDate(selectedActivity.date)}
                                </div>
                                <div>
                                    <strong>Location:</strong> {selectedActivity.location}
                                </div>
                                <div>
                                    <strong>Category:</strong> {selectedActivity.category}
                                </div>
                                <div>
                                    <strong>Status:</strong> {selectedActivity.status}
                                </div>
                                {selectedActivity.participants && (
                                    <div>
                                        <strong>Participants:</strong> {selectedActivity.participants}
                                    </div>
                                )}
                                <div>
                                    <strong>Organizer:</strong> {selectedActivity.organizer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
