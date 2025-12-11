import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';

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
    message: VoiceOfChange;
}

export default function Show({ message }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(`/voice-of-changes/${message.id}`, {
                onSuccess: () => {
                    router.visit('/voice-of-changes');
                }
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending Review' },
            approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved & Published' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' },
        };
        const style = styles[status as keyof typeof styles] || styles.pending;
        const Icon = style.icon;
        
        return (
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${style.bg} ${style.text}`}>
                <Icon className="h-4 w-4" />
                {style.label}
            </span>
        );
    };

    const canEdit = message.status === 'pending' || message.status === 'rejected';
    const canDelete = message.status === 'pending' || message.status === 'rejected';

    return (
        <AppLayout>
            <Head title={`${message.title} - Voice of Changes`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/voice-of-changes">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">Message Details</h1>
                    </div>
                    <div className="flex gap-2">
                        {canEdit && (
                            <Link href={`/voice-of-changes/${message.id}/edit`}>
                                <Button variant="outline">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                        {canDelete && (
                            <Button 
                                variant="outline" 
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        )}
                    </div>
                </div>

                {/* Message Card */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-8">
                        {/* Status Badge */}
                        <div className="mb-6">
                            {getStatusBadge(message.status)}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {message.title}
                        </h2>

                        {/* Message Content */}
                        <div className="prose max-w-none mb-6">
                            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                        </div>

                        {/* Admin Notes */}
                        {message.admin_notes && (
                            <div className={`rounded-lg p-4 mb-6 ${
                                message.status === 'rejected' 
                                    ? 'bg-red-50 border border-red-200' 
                                    : 'bg-blue-50 border border-blue-200'
                            }`}>
                                <h3 className={`font-semibold mb-2 ${
                                    message.status === 'rejected' ? 'text-red-900' : 'text-blue-900'
                                }`}>
                                    Admin Feedback:
                                </h3>
                                <p className={`text-sm ${
                                    message.status === 'rejected' ? 'text-red-800' : 'text-blue-800'
                                }`}>
                                    {message.admin_notes}
                                </p>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Submitted:</span>
                                <span className="font-medium">
                                    {new Date(message.created_at).toLocaleString()}
                                </span>
                            </div>
                            {message.updated_at !== message.created_at && (
                                <div className="flex justify-between">
                                    <span>Last Updated:</span>
                                    <span className="font-medium">
                                        {new Date(message.updated_at).toLocaleString()}
                                    </span>
                                </div>
                            )}
                            {message.published_at && (
                                <div className="flex justify-between">
                                    <span>Published:</span>
                                    <span className="font-medium">
                                        {new Date(message.published_at).toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
