import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface VolunteerApplication {
    id: number;
    name: string;
    gender: string;
    dob: string;
    address: string;
    email: string;
    contact_number: string;
    emergency_contact: string | null;
    organization: string | null;
    education_level: string | null;
    why_volunteer: string | null;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes: string | null;
    created_at: string;
}

interface Props {
    application: VolunteerApplication;
}

export default function Show({ application }: Props) {
    const { data, setData, patch, processing } = useForm({
        status: application.status,
        admin_notes: application.admin_notes || '',
    });

    const handleStatusUpdate = () => {
        patch(`/admin/volunteer-applications/${application.id}/status`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this application?')) {
            router.delete(`/admin/volunteer-applications/${application.id}`);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return styles[status as keyof typeof styles] || styles.pending;
    };

    return (
        <AppLayout>
            <Head title={`Volunteer Application - ${application.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/admin/volunteer-applications"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Volunteer Application</h1>
                            <p className="text-gray-600 mt-1">Review and manage application</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleDelete}
                        variant="destructive"
                        className="flex items-center space-x-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Application Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-gray-600">Full Name</Label>
                                    <p className="font-medium">{application.name}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Gender</Label>
                                    <p className="font-medium capitalize">{application.gender}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Date of Birth</Label>
                                    <p className="font-medium">{new Date(application.dob).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Email</Label>
                                    <p className="font-medium">{application.email}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Contact Number</Label>
                                    <p className="font-medium">{application.contact_number}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Address</Label>
                                    <p className="font-medium">{application.address}</p>
                                </div>
                                {application.emergency_contact && (
                                    <div className="col-span-2">
                                        <Label className="text-gray-600">Emergency Contact</Label>
                                        <p className="font-medium">{application.emergency_contact}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">Educational & Professional Background</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-gray-600">Education Level</Label>
                                    <p className="font-medium">{application.education_level || 'Not specified'}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Organization/College</Label>
                                    <p className="font-medium">{application.organization || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>

                        {application.why_volunteer && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-bold mb-4">Motivation</h2>
                                <Label className="text-gray-600">Why do you want to volunteer?</Label>
                                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{application.why_volunteer}</p>
                            </div>
                        )}
                    </div>

                    {/* Status Management */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">Application Status</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label>Current Status</Label>
                                    <div className="mt-2">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(application.status)}`}>
                                            {application.status}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="status">Update Status</Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as 'pending' | 'approved' | 'rejected')}
                                        className="mt-1 w-full border rounded-md px-3 py-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor="admin_notes">Admin Notes</Label>
                                    <textarea
                                        id="admin_notes"
                                        value={data.admin_notes}
                                        onChange={(e) => setData('admin_notes', e.target.value)}
                                        placeholder="Add notes about this application..."
                                        className="mt-1 w-full border rounded-md px-3 py-2 min-h-[100px]"
                                    />
                                </div>

                                <Button
                                    onClick={handleStatusUpdate}
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing ? 'Updating...' : 'Update Status'}
                                </Button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">Application Info</h2>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <Label className="text-gray-600">Applied On</Label>
                                    <p>{new Date(application.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
