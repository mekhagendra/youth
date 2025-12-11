import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface VoiceOfChange {
    id: number;
    title: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
}

interface Props {
    message: VoiceOfChange;
}

export default function Edit({ message }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: message.title,
        message: message.message,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/voice-of-changes/${message.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Message - Voice of Changes" />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/voice-of-changes">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Message</h1>
                        <p className="text-gray-600 mt-1">Update your voice of change message</p>
                    </div>
                </div>

                {/* Admin Notes (if rejected) */}
                {message.status === 'rejected' && message.admin_notes && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="font-semibold text-red-900 mb-2">Reason for rejection:</h3>
                        <p className="text-sm text-red-800">{message.admin_notes}</p>
                    </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Update Guidelines:</h3>
                    <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                        <li>Your updated message will be resubmitted for admin review</li>
                        <li>Make sure to address any feedback provided in the admin notes</li>
                        <li>Keep your message clear, respectful, and constructive</li>
                    </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter a compelling title for your message"
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="Share your thoughts, ideas, or suggestions for positive change..."
                            rows={10}
                            className={errors.message ? 'border-red-500' : ''}
                        />
                        {errors.message && (
                            <p className="text-sm text-red-600">{errors.message}</p>
                        )}
                        <p className="text-sm text-gray-500">
                            {data.message.length} characters
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update & Resubmit'}
                        </Button>
                        <Link href="/voice-of-changes">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
