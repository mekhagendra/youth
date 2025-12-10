import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

interface TeamMember {
    id: number;
    membership_id: string;
    name: string;
    designation: string;
    rank: number;
    photo: string | null;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    display_order: number;
    members_count: number;
    members: TeamMember[];
}

interface Props {
    teams: Team[];
}

export default function Index({ teams }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this team? All member assignments will be removed.')) {
            setDeletingId(id);
            router.delete(`/admin/teams/${id}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Manage Teams" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Teams Management</h1>
                            <p className="mt-2 text-gray-600">Create and manage different teams with member assignments</p>
                        </div>
                        <Link href="/admin/teams/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-5 w-5 mr-2" />
                                Create Team
                            </Button>
                        </Link>
                    </div>

                    {/* Teams Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.length === 0 ? (
                            <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
                                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Teams Yet</h3>
                                <p className="text-gray-500 mb-6">Get started by creating your first team.</p>
                                <Link href="/admin/teams/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="h-5 w-5 mr-2" />
                                        Create First Team
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            teams.map((team) => (
                                <div
                                    key={team.id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                >
                                    {/* Team Header */}
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold">{team.name}</h3>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    team.is_active
                                                        ? 'bg-green-500/20 text-green-100'
                                                        : 'bg-red-500/20 text-red-100'
                                                }`}
                                            >
                                                {team.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-blue-100 text-sm line-clamp-2 min-h-[2.5rem]">
                                            {team.description || 'No description provided'}
                                        </p>
                                    </div>

                                    {/* Members Preview */}
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <Users className="h-5 w-5 text-gray-500 mr-2" />
                                            <span className="text-gray-700 font-medium">
                                                {team.members_count} {team.members_count === 1 ? 'Member' : 'Members'}
                                            </span>
                                        </div>

                                        {/* Member Avatars */}
                                        {team.members.length > 0 && (
                                            <div className="flex -space-x-2 mb-4">
                                                {team.members.slice(0, 5).map((member) => (
                                                    <div
                                                        key={member.id}
                                                        className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                                                        title={`${member.name} - ${member.designation}`}
                                                    >
                                                        {member.photo ? (
                                                            <img
                                                                src={member.photo}
                                                                alt={member.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-semibold text-sm">
                                                                {member.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {team.members.length > 5 && (
                                                    <div className="relative w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-semibold">
                                                        +{team.members.length - 5}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-4">
                                            <Link href={`/admin/teams/${team.id}`} className="flex-1">
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/teams/${team.id}/edit`} className="flex-1">
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-green-600 border-green-600 hover:bg-green-50"
                                                >
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                className="text-red-600 border-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(team.id)}
                                                disabled={deletingId === team.id}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
