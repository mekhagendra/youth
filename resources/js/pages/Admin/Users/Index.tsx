import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    user_type: string;
    designation?: string;
    profile_picture?: string;
    created_at: string;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props extends PageProps {
    users: PaginatedUsers;
}

export default function Index({ auth, users }: Props) {
    const isAdmin = auth?.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    if (!auth?.user || !isAdmin) {
        return null;
    }

    const safeUsers = Array.isArray(users?.data) ? users.data : [];
    const currentPage = users?.current_page ?? 1;
    const lastPage = users?.last_page ?? 1;
    const perPage = users?.per_page ?? 10;
    const total = users?.total ?? 0;
    const hasPages = lastPage > 1;

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete user "${name}"?`)) {
            router.delete(`/admin/users/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const getUserTypeBadge = (userType: string) => {
        const colors: Record<string, string> = {
            'System Admin': 'bg-purple-100 text-purple-800',
            'System Manager': 'bg-blue-100 text-blue-800',
            'Employee': 'bg-green-100 text-green-800',
            'Intern': 'bg-yellow-100 text-yellow-800',
            'Volunteer': 'bg-orange-100 text-orange-800',
            'Member': 'bg-gray-100 text-gray-800',
            'Guest': 'bg-gray-50 text-gray-600',
        };
        const colorClass = colors[userType] || 'bg-gray-100 text-gray-800';
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                {userType}
            </span>
        );
    };

    return (
        <AppLayout>
            <Head title="Users Management" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
                        <p className="text-gray-600 mt-1">Manage all system users and their access levels</p>
                    </div>
                    <Link href="/admin/users/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New User
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{total}</p>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Designation
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {safeUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    safeUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {user.profile_picture ? (
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={user.profile_picture.startsWith('http') 
                                                                    ? user.profile_picture 
                                                                    : `/${user.profile_picture}`}
                                                                alt={user.name}
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                <span className="text-gray-600 font-medium text-sm">
                                                                    {user.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getUserTypeBadge(user.user_type || 'Guest')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {user.designation || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/users/${user.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <SquarePen className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleDelete(user.id, user.name)}
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

                    {/* Pagination */}
                    {hasPages && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{((currentPage - 1) * perPage) + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(currentPage * perPage, total)}</span> of{' '}
                                    <span className="font-medium">{total}</span> results
                                </div>
                                <div className="flex gap-2">
                                    {currentPage > 1 && (
                                        <Button
                                            variant="outline"
                                            onClick={() => router.get(`/admin/users?page=${currentPage - 1}`)}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {currentPage < lastPage && (
                                        <Button
                                            variant="outline"
                                            onClick={() => router.get(`/admin/users?page=${currentPage + 1}`)}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
