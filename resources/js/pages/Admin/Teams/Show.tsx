import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Mail, Phone, MapPin, User, Award, Hash } from 'lucide-react';

interface TeamMember {
    id: number;
    membership_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    photo: string | null;
    designation: string;
    rank: number;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    display_order: number;
    members: TeamMember[];
}

interface Props {
    team: Team;
}

export default function Show({ team }: Props) {
    // Sort members by rank
    const sortedMembers = [...team.members].sort((a, b) => a.rank - b.rank);

    return (
        <AppLayout>
            <Head title={`Team - ${team.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/teams">
                                <Button variant="outline">
                                    <ArrowLeft className="h-5 w-5 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            team.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {team.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                {team.description && (
                                    <p className="mt-2 text-gray-600">{team.description}</p>
                                )}
                            </div>
                        </div>

                        <Link href={`/admin/teams/${team.id}/edit`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Edit className="h-5 w-5 mr-2" />
                                Edit Team
                            </Button>
                        </Link>
                    </div>

                    {/* Team Members */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Team Members ({team.members.length})
                        </h2>

                        {team.members.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>No members assigned to this team yet.</p>
                                <Link href={`/admin/teams/${team.id}/edit`}>
                                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                                        Add Members
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        {/* Member Header with Photo */}
                                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white text-center">
                                            <div className="flex justify-center mb-4">
                                                {member.photo ? (
                                                    <img
                                                        src={member.photo}
                                                        alt={member.name}
                                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                                    />
                                                ) : (
                                                    <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center shadow-lg">
                                                        <span className="text-4xl font-bold">
                                                            {member.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <Award className="h-4 w-4" />
                                                <p className="text-blue-100 font-medium">{member.designation}</p>
                                            </div>
                                            <div className="flex items-center justify-center gap-1 text-sm text-blue-100">
                                                <Hash className="h-3 w-3" />
                                                <span>Rank: {member.rank}</span>
                                            </div>
                                        </div>

                                        {/* Member Details */}
                                        <div className="p-6 space-y-4">
                                            {/* Membership ID */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <User className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Member ID</p>
                                                    <p className="text-gray-900 font-medium">{member.membership_id}</p>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <Mail className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="text-blue-600 hover:text-blue-700 font-medium break-all"
                                                    >
                                                        {member.email}
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            {member.phone && (
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Phone className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                                                        <a
                                                            href={`tel:${member.phone}`}
                                                            className="text-gray-900 font-medium hover:text-blue-600"
                                                        >
                                                            {member.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Address */}
                                            {member.address && (
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                        <MapPin className="h-4 w-4 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
                                                        <p className="text-gray-900">{member.address}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Description */}
                                            {member.description && (
                                                <div className="pt-4 border-t border-gray-200">
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">About</p>
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {member.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Team Info Summary */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-blue-600 font-medium mb-1">Team Name</p>
                                <p className="text-gray-900 font-semibold">{team.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-600 font-medium mb-1">Display Order</p>
                                <p className="text-gray-900 font-semibold">{team.display_order}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-600 font-medium mb-1">Total Members</p>
                                <p className="text-gray-900 font-semibold">{team.members.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
