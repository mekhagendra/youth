import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Upload, X } from 'lucide-react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        auth.user.profile_picture ? `/storage/${auth.user.profile_picture}` : null
    );

    const isAdmin = auth.user && (
        auth.user.user_type === 'System Admin' || 
        auth.user.user_type === 'System Manager'
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        const fileInput = document.getElementById('profile_picture') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your profile picture, name, designation and email address"
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                {/* Profile Picture */}
                                <div className="grid gap-2">
                                    <Label htmlFor="profile_picture">Profile Picture</Label>
                                    
                                    <div className="flex items-center gap-4">
                                        {previewUrl ? (
                                            <div className="relative">
                                                <img 
                                                    src={previewUrl} 
                                                    alt="Profile preview" 
                                                    className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                                <Upload className="h-8 w-8 text-gray-400" />
                                            </div>
                                        )}
                                        
                                        <div className="flex-1">
                                            <Input
                                                id="profile_picture"
                                                type="file"
                                                name="profile_picture"
                                                accept="image/jpeg,image/jpg,image/png,image/gif"
                                                onChange={handleImageChange}
                                                className="cursor-pointer"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                JPG, PNG or GIF. Max size 2MB.
                                            </p>
                                        </div>
                                    </div>

                                    <InputError
                                        className="mt-2"
                                        message={errors.profile_picture}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                        readOnly={!isAdmin}
                                        disabled={!isAdmin}
                                    />
                                    {!isAdmin && (
                                        <p className="text-xs text-gray-500">
                                            Contact an administrator to change your name.
                                        </p>
                                    )}

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="designation">Designation</Label>

                                    <Input
                                        id="designation"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.designation || ''}
                                        name="designation"
                                        autoComplete="organization-title"
                                        placeholder="e.g., Member, Volunteer, Program Coordinator"
                                        readOnly={!isAdmin}
                                        disabled={!isAdmin}
                                    />
                                    {!isAdmin && (
                                        <p className="text-xs text-gray-500">
                                            Contact an administrator to change your designation.
                                        </p>
                                    )}

                                    <InputError
                                        className="mt-2"
                                        message={errors.designation}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    A new verification link has
                                                    been sent to your email
                                                    address.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Saved
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
