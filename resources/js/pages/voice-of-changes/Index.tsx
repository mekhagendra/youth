import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Eye, Edit, Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface VoiceOfChange {
    id: number;
    title: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
    published_at?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    messages: VoiceOfChange[];
}

export default function Index({ messages }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(`/voice-of-changes/${id}`, {
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

    const canEdit = (message: VoiceOfChange) => {
        return message.status === 'pending' || message.status === 'rejected';
    };

    const canDelete = (message: VoiceOfChange) => {
        return message.status === 'pending' || message.status === 'rejected';
    };

    return (
        <AppLayout>
            <Head title="My Messages - Voice of Changes" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Messages</h1>
                        <p className="text-gray-600 mt-1">Submit your voice of change messages for review</p>
                    </div>
                    <Link href="/voice-of-changes/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Message
                        </Button>
                    </Link>
                </div>

                {/* Messages Grid */}
                {messages.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-gray-500 text-lg mb-4">You haven't submitted any messages yet</p>
                        <Link href="/voice-of-changes/create">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Message
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {messages.map((message) => (
                            <div key={message.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{message.title}</h3>
                                        {getStatusBadge(message.status)}
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{message.message}</p>
                                    
                                    {message.admin_notes && (
                                        <div className="bg-gray-50 rounded p-3 mb-4">
                                            <p className="text-xs font-semibold text-gray-700 mb-1">Admin Notes:</p>
                                            <p className="text-xs text-gray-600">{message.admin_notes}</p>
                                        </div>
                                    )}
                                    
                                    <div className="text-xs text-gray-500 mb-4">
                                        Submitted: {new Date(message.created_at).toLocaleDateString()}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Link href={`/voice-of-changes/${message.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye className="h-4 w-4 mr-2" />
                                                View
                                            </Button>
                                        </Link>
                                        
                                        {canEdit(message) && (
                                            <Link href={`/voice-of-changes/${message.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        )}
                                        
                                        {canDelete(message) && (
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleDelete(message.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
