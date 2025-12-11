import { Head } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';
import { Mail, Phone, Award, Hash } from 'lucide-react';

interface TeamMember {
    id: number;
    membership_id: string;
    name: string;
    email: string;
    phone: string;
    photo: string | null;
    designation: string;
    rank: number;
    show_email: boolean;
    show_phone: boolean;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    members: TeamMember[];
}

interface Props {
    teams: Team[];
}

export default function OurTeam({ teams }: Props) {
    return (
        <>
            <Head title="Our Team - Youth Initiative Nepal" />
            <PublicHeader />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-green-700 to-green-300 text-white pt-4 pb-2">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">Our Team</h1>
                    </div>
                </div>

                {/* Teams Section */}
                <div className="container mx-auto px-4 py-16">
                    {teams.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-600 text-xl">No teams to display at the moment.</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {teams.map((team) => (
                                <div key={team.id} className="scroll-mt-20" id={`team-${team.id}`}>
                                    {/* Team Header */}
                                    <div className="mb-8">
                                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{team.name}</h2>
                                        {team.description && (
                                            <p className="text-lg text-gray-600 max-w-4xl">{team.description}</p>
                                        )}
                                    </div>

                                    {/* Team Members Grid */}
                                    {team.members.length === 0 ? (
                                        <p className="text-gray-500 italic">No members in this team yet.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {team.members.map((member) => (
                                                <div
                                                    key={member.id}
                                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    {/* Member Photo & Header */}
                                                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white text-center relative">
                                                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                                                            <Hash className="h-3 w-3" />
                                                            {member.rank}
                                                        </div>
                                                        
                                                        <div className="flex justify-center mb-4">
                                                            {member.photo ? (
                                                                <img
                                                                    src={member.photo}
                                                                    alt={member.name}
                                                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                                                                />
                                                            ) : (
                                                                <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white flex items-center justify-center shadow-xl">
                                                                    <span className="text-5xl font-bold">
                                                                        {member.name.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                                        
                                                        <div className="flex items-center justify-center gap-2 mb-2">
                                                            <Award className="h-4 w-4" />
                                                            <p className="text-blue-100 font-medium">{member.designation}</p>
                                                        </div>
                                                        
                                                        <p className="text-blue-200 text-sm">ID: {member.membership_id}</p>
                                                    </div>

                                                    {/* Contact Information */}
                                                    <div className="p-6 space-y-3">
                                                        {member.show_email && member.email && (
                                                            <div className="flex items-start gap-3">
                                                                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                                    <Mail className="h-4 w-4 text-purple-600" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                                                                    <a
                                                                        href={`mailto:${member.email}`}
                                                                        className="text-blue-600 hover:text-blue-700 text-sm break-all font-medium"
                                                                    >
                                                                        {member.email}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {member.show_phone && member.phone && (
                                                            <div className="flex items-start gap-3">
                                                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                                    <Phone className="h-4 w-4 text-green-600" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                                                                    <a
                                                                        href={`tel:${member.phone}`}
                                                                        className="text-gray-900 hover:text-blue-600 text-sm font-medium"
                                                                    >
                                                                        {member.phone}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {!member.show_email && !member.show_phone && (
                                                            <p className="text-gray-400 text-sm italic text-center py-2">
                                                                Contact information private
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Divider between teams (except last) */}
                                    {team.id !== teams[teams.length - 1].id && (
                                        <div className="mt-16 border-t border-gray-200"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
                        <p className="text-xl mb-8 text-blue-100">
                            Become a part of our mission to empower youth across Nepal
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/members/signup"
                                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Become a Member
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
