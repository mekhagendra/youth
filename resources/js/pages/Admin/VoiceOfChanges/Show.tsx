import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ThumbsUp, ThumbsDown, EyeOff, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    membership_number?: string;
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

interface ShowProps extends PageProps {
    message: VoiceOfChange;
}

export default function Show({ auth, message }: ShowProps) {
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    const approveForm = useForm({
        admin_notes: '',
    });

    const rejectForm = useForm({
        admin_notes: '',
    });

    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!isAdmin) {
        return null;
    }

    const handleApprove = (e: React.FormEvent) => {
        e.preventDefault();
        approveForm.post(`/admin/voice-of-changes/${message.id}/approve`, {
            onSuccess: () => {
                setShowApproveDialog(false);
            },
        });
    };

    const handleReject = (e: React.FormEvent) => {
        e.preventDefault();
        rejectForm.post(`/admin/voice-of-changes/${message.id}/reject`, {
            onSuccess: () => {
                setShowRejectDialog(false);
            },
        });
    };

    const handleUnpublish = () => {
        if (confirm('Are you sure you want to unpublish this message?')) {
            router.post(`/admin/voice-of-changes/${message.id}/unpublish`);
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

    return (
        <AppLayout>
            <Head title={`${message.title} - Voice of Changes Admin`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/voice-of-changes">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">Review Message</h1>
                    </div>
                </div>

                {/* Message Card */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-8">
                        {/* Status Badge */}
                        <div className="mb-6">
                            {getStatusBadge(message.status)}
                        </div>

                        {/* Author Info */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Author Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Name:</span>
                                    <span className="ml-2 font-medium text-gray-900">{message.user.name}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Email:</span>
                                    <span className="ml-2 font-medium text-gray-900">{message.user.email}</span>
                                </div>
                                {message.user.membership_number && (
                                    <div>
                                        <span className="text-gray-600">Membership:</span>
                                        <span className="ml-2 font-medium text-gray-900">{message.user.membership_number}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {message.title}
                        </h2>

                        {/* Message Content */}
                        <div className="prose max-w-none mb-6">
                            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                        </div>

                        {/* Admin Notes (if any) */}
                        {message.admin_notes && (
                            <div className={`rounded-lg p-4 mb-6 ${
                                message.status === 'rejected' 
                                    ? 'bg-red-50 border border-red-200' 
                                    : 'bg-blue-50 border border-blue-200'
                            }`}>
                                <h3 className={`font-semibold mb-2 ${
                                    message.status === 'rejected' ? 'text-red-900' : 'text-blue-900'
                                }`}>
                                    Previous Admin Notes:
                                </h3>
                                <p className={`text-sm ${
                                    message.status === 'rejected' ? 'text-red-800' : 'text-blue-800'
                                }`}>
                                    {message.admin_notes}
                                </p>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="border-t pt-4 space-y-2 text-sm text-gray-600 mb-6">
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

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {message.status === 'pending' && (
                                <>
                                    <Button 
                                        onClick={() => setShowApproveDialog(true)}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <ThumbsUp className="h-4 w-4 mr-2" />
                                        Approve & Publish
                                    </Button>
                                    <Button 
                                        onClick={() => setShowRejectDialog(true)}
                                        variant="outline"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <ThumbsDown className="h-4 w-4 mr-2" />
                                        Reject
                                    </Button>
                                </>
                            )}
                            {message.status === 'approved' && (
                                <Button 
                                    onClick={handleUnpublish}
                                    variant="outline"
                                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                >
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Unpublish
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Approve Dialog */}
                {showApproveDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold mb-4">Approve & Publish Message</h3>
                            <form onSubmit={handleApprove} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="approve-notes">Admin Notes (Optional)</Label>
                                    <Textarea
                                        id="approve-notes"
                                        value={approveForm.data.admin_notes}
                                        onChange={(e) => approveForm.setData('admin_notes', e.target.value)}
                                        placeholder="Add any notes or feedback for the author..."
                                        rows={4}
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button 
                                        type="submit" 
                                        disabled={approveForm.processing}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        {approveForm.processing ? 'Approving...' : 'Approve & Publish'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => setShowApproveDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Reject Dialog */}
                {showRejectDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold mb-4">Reject Message</h3>
                            <form onSubmit={handleReject} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="reject-notes">Reason for Rejection *</Label>
                                    <Textarea
                                        id="reject-notes"
                                        value={rejectForm.data.admin_notes}
                                        onChange={(e) => rejectForm.setData('admin_notes', e.target.value)}
                                        placeholder="Explain why this message is being rejected..."
                                        rows={4}
                                        className={rejectForm.errors.admin_notes ? 'border-red-500' : ''}
                                        required
                                    />
                                    {rejectForm.errors.admin_notes && (
                                        <p className="text-sm text-red-600">{rejectForm.errors.admin_notes}</p>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <Button 
                                        type="submit" 
                                        disabled={rejectForm.processing}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        {rejectForm.processing ? 'Rejecting...' : 'Reject Message'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => setShowRejectDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
