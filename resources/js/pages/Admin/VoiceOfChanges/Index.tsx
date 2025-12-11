import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Eye, Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
}

interface VoiceOfChange {
    id: number;
    user_id: number;
    user: User;
    title: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
    published_at?: string;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    messages: VoiceOfChange[];
}

export default function Index({ auth, messages }: Props) {
    const [statusFilter, setStatusFilter] = useState('all');

    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(`/admin/voice-of-changes/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
            approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
        };
        const style = styles[status as keyof typeof styles] || styles.pending;
        const Icon = style.icon;
        
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                <Icon className="h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const filteredMessages = statusFilter === 'all' 
        ? messages 
        : messages.filter(m => m.status === statusFilter);

    const stats = {
        total: messages.length,
        pending: messages.filter(m => m.status === 'pending').length,
        approved: messages.filter(m => m.status === 'approved').length,
        rejected: messages.filter(m => m.status === 'rejected').length,
    };

    return (
        <AppLayout>
            <Head title="Voice of Changes - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Voice of Changes</h1>
                        <p className="text-gray-600 mt-1">Review and manage member messages</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Total Messages</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Pending Review</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Approved</p>
                        <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Rejected</p>
                        <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                        <div className="flex gap-2">
                            {['all', 'pending', 'approved', 'rejected'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === status
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Messages Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMessages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No messages found
                                    </td>
                                </tr>
                            ) : (
                                filteredMessages.map((message) => (
                                    <tr key={message.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                                {message.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{message.user.name}</div>
                                            <div className="text-xs text-gray-500">{message.user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(message.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(message.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/voice-of-changes/${message.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleDelete(message.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
