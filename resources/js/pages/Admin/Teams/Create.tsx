import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface Member {
    id: number;
    membership_id: string;
    name: string;
    email: string;
    phone: string;
    photo: string | null;
}

interface TeamMember {
    member_id: number;
    designation: string;
    rank: number;
}

interface Props {
    members: Member[];
}

export default function Create({ members }: Props) {
    const form = useForm({
        name: '',
        description: '',
        is_active: true,
        display_order: 0,
        members: [] as TeamMember[],
    });

    const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Validate that all members have designation filled
        const invalidMembers = selectedMembers.filter(m => !m.designation || m.designation.trim() === '');
        if (invalidMembers.length > 0) {
            alert('Please fill in the designation for all members before submitting.');
            return;
        }
        
        console.log('Submitting with selected members:', selectedMembers);
        
        // Use router.post directly with all data
        router.post('/admin/teams', {
            name: form.data.name,
            description: form.data.description,
            is_active: form.data.is_active,
            display_order: form.data.display_order,
            members: selectedMembers,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Team created successfully');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    const addMember = (memberId: number) => {
        if (selectedMembers.some(m => m.member_id === memberId)) {
            alert('This member is already added to the team.');
            return;
        }

        setSelectedMembers([
            ...selectedMembers,
            {
                member_id: memberId,
                designation: '',
                rank: selectedMembers.length + 1,
            },
        ]);
    };

    const removeMember = (memberId: number) => {
        const filtered = selectedMembers.filter(m => m.member_id !== memberId);
        // Re-rank members after removal
        const reranked = filtered.map((m, index) => ({ ...m, rank: index + 1 }));
        setSelectedMembers(reranked);
    };

    const updateMemberDesignation = (memberId: number, designation: string) => {
        setSelectedMembers(
            selectedMembers.map(m =>
                m.member_id === memberId ? { ...m, designation } : m
            )
        );
    };

    const updateMemberRank = (memberId: number, rank: number) => {
        setSelectedMembers(
            selectedMembers.map(m =>
                m.member_id === memberId ? { ...m, rank } : m
            )
        );
    };

    const getMemberById = (memberId: number) => {
        return members.find(m => m.id === memberId);
    };

    const filteredMembers = members.filter(
        member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.membership_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const availableMembers = filteredMembers.filter(
        member => !selectedMembers.some(sm => sm.member_id === member.id)
    );

    // Sort selected members by rank
    const sortedSelectedMembers = [...selectedMembers].sort((a, b) => a.rank - b.rank);

    return (
        <AppLayout>
            <Head title="Create Team" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-4">
                        <Link href="/admin/teams">
                            <Button variant="outline">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Create New Team</h1>
                            <p className="mt-1 text-gray-600">Add a new team and assign members with their roles</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Team Details */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 space-y-4 sticky top-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Details</h2>

                                    {/* Team Name */}
                                    <div>
                                        <Label htmlFor="name">Team Name *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={form.data.name}
                                            onChange={(e) => form.setData('name', e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g., Executive Board, Youth Council"
                                            required
                                        />
                                        {form.errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <textarea
                                            id="description"
                                            value={form.data.description}
                                            onChange={(e) => form.setData('description', e.target.value)}
                                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={4}
                                            placeholder="Brief description of the team..."
                                        />
                                        {form.errors.description && (
                                            <p className="mt-1 text-sm text-red-600">{form.errors.description}</p>
                                        )}
                                    </div>

                                    {/* Display Order */}
                                    <div>
                                        <Label htmlFor="display_order">Display Order</Label>
                                        <Input
                                            id="display_order"
                                            type="number"
                                            value={form.data.display_order}
                                            onChange={(e) => form.setData('display_order', parseInt(e.target.value))}
                                            className="mt-1"
                                            placeholder="0"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                                    </div>

                                    {/* Active Status */}
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={form.data.is_active}
                                            onChange={(e) => form.setData('is_active', e.target.checked)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <Label htmlFor="is_active" className="mb-0">Active Team</Label>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Member Management */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Selected Members */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Team Members ({selectedMembers.length})
                                    </h2>

                                    {selectedMembers.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">
                                            <p className="mb-2">No members added yet</p>
                                            <p className="text-sm">Search and add members from the list below</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {sortedSelectedMembers.map((teamMember) => {
                                                const member = getMemberById(teamMember.member_id);
                                                if (!member) return null;

                                                return (
                                                    <div
                                                        key={teamMember.member_id}
                                                        className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            {member.photo ? (
                                                                <img
                                                                    src={member.photo}
                                                                    alt={member.name}
                                                                    className="w-16 h-16 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
                                                                    {member.name.charAt(0).toUpperCase()}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex-1 space-y-3">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                                                <p className="text-sm text-gray-600">ID: {member.membership_id}</p>
                                                                <p className="text-sm text-gray-500">{member.email}</p>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div>
                                                                    <Label htmlFor={`designation-${member.id}`} className="text-xs">
                                                                        Designation *
                                                                    </Label>
                                                                    <Input
                                                                        id={`designation-${member.id}`}
                                                                        type="text"
                                                                        value={teamMember.designation}
                                                                        onChange={(e) =>
                                                                            updateMemberDesignation(member.id, e.target.value)
                                                                        }
                                                                        placeholder="e.g., President, Member"
                                                                        className="mt-1"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <Label htmlFor={`rank-${member.id}`} className="text-xs">
                                                                        Rank *
                                                                    </Label>
                                                                    <Input
                                                                        id={`rank-${member.id}`}
                                                                        type="number"
                                                                        value={teamMember.rank}
                                                                        onChange={(e) =>
                                                                            updateMemberRank(member.id, parseInt(e.target.value))
                                                                        }
                                                                        className="mt-1"
                                                                        min={1}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeMember(member.id)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <X className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Available Members to Add */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Members</h2>

                                    {/* Search */}
                                    <div className="mb-4">
                                        <Input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search members by name, ID, or email..."
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Member List */}
                                    <div className="max-h-96 overflow-y-auto space-y-2">
                                        {availableMembers.length === 0 ? (
                                            <p className="text-center py-8 text-gray-500">
                                                {searchTerm ? 'No members found' : 'All active members have been added'}
                                            </p>
                                        ) : (
                                            availableMembers.map((member) => (
                                                <div
                                                    key={member.id}
                                                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                                >
                                                    <div className="flex-shrink-0">
                                                        {member.photo ? (
                                                            <img
                                                                src={member.photo}
                                                                alt={member.name}
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                                                                {member.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                                                        <p className="text-sm text-gray-600">ID: {member.membership_id}</p>
                                                        <p className="text-xs text-gray-500">{member.email}</p>
                                                    </div>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => addMember(member.id)}
                                                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                                    >
                                                        <Plus className="h-4 w-4 mr-1" />
                                                        Add
                                                    </Button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <Link href="/admin/teams">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={form.processing || selectedMembers.length === 0 || !form.data.name}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {form.processing ? 'Creating...' : `Create Team ${selectedMembers.length > 0 ? `(${selectedMembers.length} members)` : ''}`}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
