import { useState } from 'react';
import { Calendar, MapPin, Eye, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

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

interface ActivityProps {
    showCount?: number;
    showViewAll?: boolean;
    className?: string;
}

export default function Activity({ showCount = 4, showViewAll = true, className = "" }: ActivityProps) {
    // Sample activity data - this would normally come from API/database
    const [activities] = useState<Activity[]>([
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
            `,
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
            content: `
                <h2>Community Health Awareness Campaign</h2>
                <p>Our health awareness campaign focuses on educating communities about preventive healthcare, nutrition, and healthy lifestyle practices.</p>
                
                <h3>Campaign Activities:</h3>
                <ul>
                    <li>Health screenings and checkups</li>
                    <li>Nutrition education workshops</li>
                    <li>Vaccination awareness programs</li>
                    <li>Mental health support sessions</li>
                    <li>Clean water and sanitation education</li>
                </ul>
                
                <h3>Target Communities:</h3>
                <p>We will be visiting 10 villages in the Chitwan district, reaching approximately 500 families.</p>
                
                <h3>Medical Team:</h3>
                <p>Our team includes qualified doctors, nurses, and health educators who will provide professional guidance and support.</p>
            `,
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
            content: `
                <h2>Environmental Conservation Seminar</h2>
                <p>Join environmental experts and activists as we discuss the critical issues facing our planet and explore practical solutions for conservation.</p>
                
                <h3>Seminar Topics:</h3>
                <ul>
                    <li>Climate change and its local impacts</li>
                    <li>Sustainable agriculture practices</li>
                    <li>Waste management and recycling</li>
                    <li>Renewable energy solutions</li>
                    <li>Biodiversity conservation</li>
                </ul>
                
                <h3>Guest Speakers:</h3>
                <p>We have invited renowned environmental scientists, policy makers, and grassroots activists to share their expertise and experiences.</p>
                
                <h3>Interactive Sessions:</h3>
                <p>The seminar will include interactive workshops where participants can learn practical conservation techniques and develop action plans for their communities.</p>
            `,
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
            content: `
                <h2>Women Empowerment Workshop</h2>
                <p>This workshop is designed to empower women through skill development, entrepreneurship training, and awareness about women's rights.</p>
                
                <h3>Workshop Components:</h3>
                <ul>
                    <li>Entrepreneurship and business skills</li>
                    <li>Financial literacy and planning</li>
                    <li>Legal rights awareness</li>
                    <li>Leadership development</li>
                    <li>Networking and mentorship</li>
                </ul>
                
                <h3>Expected Outcomes:</h3>
                <p>Participants will gain practical skills and knowledge to start their own businesses, understand their legal rights, and become leaders in their communities.</p>
                
                <h3>Follow-up Support:</h3>
                <p>We provide ongoing mentorship and support to help participants implement their business plans and achieve their goals.</p>
            `,
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
            content: `
                <h2>Youth Entrepreneurship Fair</h2>
                <p>An exciting platform for young entrepreneurs to showcase their innovative business ideas and connect with potential investors and mentors.</p>
                
                <h3>Fair Activities:</h3>
                <ul>
                    <li>Startup pitch competitions</li>
                    <li>Business plan presentations</li>
                    <li>Investor networking sessions</li>
                    <li>Mentorship meetings</li>
                    <li>Technology demonstrations</li>
                </ul>
                
                <h3>Prizes and Awards:</h3>
                <p>Winners will receive cash prizes, incubation support, and potential investment opportunities from our partner organizations.</p>
                
                <h3>Who Can Participate:</h3>
                <p>Open to all young entrepreneurs aged 18-35 with innovative business ideas or existing startups looking for growth opportunities.</p>
            `,
            category: "community",
            participants: 200,
            organizer: "Startup Nepal",
            status: "upcoming"
        }
    ]);

    // Get activities to display based on showCount
    const displayActivities = activities.slice(0, showCount);

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

    return (
        <section className={`bg-gray-50 py-20 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        LATEST ACTIVITIES
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join us in our mission to create positive change through various community activities and programs.
                    </p>
                </div>

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                    {displayActivities.map((activity) => (
                        <div 
                            key={activity.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Activity Image */}
                            <div className="relative overflow-hidden h-48">
                                <img 
                                    src={activity.image} 
                                    alt={activity.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                        {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>

                            {/* Activity Content */}
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2">
                                    {activity.title}
                                </h3>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {activity.description}
                                </p>

                                {/* Activity Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                        <span className="truncate">{activity.location}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-4 w-4 mr-2 text-green-500" />
                                        <span>{formatDate(activity.date)}</span>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <Link
                                    href={`/activities/${activity.id}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Activities Button */}
                {showViewAll && activities.length > showCount && (
                    <div className="text-center">
                        <Link
                            href="/activities"
                            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                            View All Activities
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
