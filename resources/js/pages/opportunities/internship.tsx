import { Head, useForm } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function InternshipApplication() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        gender: '',
        dob: '',
        address: '',
        email: '',
        contact_number: '',
        emergency_contact: '',
        organization: '',
        education_level: '',
        why_internship: '',
        field_of_interest: '',
        available_from: '',
        duration_months: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/opportunities/internship');
    };

    return (
        <>
            <Head title="Internship Opportunities - Youth Initiative" />
            <PublicHeader />

            <div className="pt-32 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                Internship Opportunities
                            </h1>
                            <p className="text-xl text-gray-600">
                                Gain valuable experience and contribute to meaningful youth initiatives
                            </p>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                                </div>

                                {/* Gender */}
                                <div>
                                    <Label>Gender *</Label>
                                    <div className="flex gap-4 mt-2">
                                        {['male', 'female', 'other'].map((gender) => (
                                            <label key={gender} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={gender}
                                                    checked={data.gender === gender}
                                                    onChange={(e) => setData('gender', e.target.value)}
                                                    required
                                                    className="w-4 h-4"
                                                />
                                                <span className="capitalize">{gender}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <Label htmlFor="dob">Date of Birth *</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={data.dob}
                                        onChange={(e) => setData('dob', e.target.value)}
                                        required
                                    />
                                    {errors.dob && <p className="text-sm text-red-600 mt-1">{errors.dob}</p>}
                                </div>

                                {/* Address */}
                                <div>
                                    <Label htmlFor="address">Address *</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Enter your address"
                                        required
                                    />
                                    {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="example@email.com"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <Label htmlFor="contact_number">Contact Number *</Label>
                                    <Input
                                        id="contact_number"
                                        type="text"
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        placeholder="Enter your contact number"
                                        required
                                    />
                                    {errors.contact_number && <p className="text-sm text-red-600 mt-1">{errors.contact_number}</p>}
                                </div>

                                {/* Emergency Contact */}
                                <div>
                                    <Label htmlFor="emergency_contact">Emergency Contact Person and Number</Label>
                                    <Input
                                        id="emergency_contact"
                                        type="text"
                                        value={data.emergency_contact}
                                        onChange={(e) => setData('emergency_contact', e.target.value)}
                                        placeholder="Name and contact number"
                                    />
                                    {errors.emergency_contact && <p className="text-sm text-red-600 mt-1">{errors.emergency_contact}</p>}
                                </div>

                                {/* Organization */}
                                <div>
                                    <Label htmlFor="organization">Organization / College</Label>
                                    <Input
                                        id="organization"
                                        type="text"
                                        value={data.organization}
                                        onChange={(e) => setData('organization', e.target.value)}
                                        placeholder="Your current organization or college"
                                    />
                                    {errors.organization && <p className="text-sm text-red-600 mt-1">{errors.organization}</p>}
                                </div>

                                {/* Education Level */}
                                <div>
                                    <Label htmlFor="education_level">Education Level</Label>
                                    <Input
                                        id="education_level"
                                        type="text"
                                        value={data.education_level}
                                        onChange={(e) => setData('education_level', e.target.value)}
                                        placeholder="e.g., High School, Bachelor's, Master's"
                                    />
                                    {errors.education_level && <p className="text-sm text-red-600 mt-1">{errors.education_level}</p>}
                                </div>

                                {/* Field of Interest */}
                                <div>
                                    <Label htmlFor="field_of_interest">Field of Interest</Label>
                                    <Input
                                        id="field_of_interest"
                                        type="text"
                                        value={data.field_of_interest}
                                        onChange={(e) => setData('field_of_interest', e.target.value)}
                                        placeholder="e.g., Program Management, Social Media, Research"
                                    />
                                    {errors.field_of_interest && <p className="text-sm text-red-600 mt-1">{errors.field_of_interest}</p>}
                                </div>

                                {/* Available From */}
                                <div>
                                    <Label htmlFor="available_from">Available From</Label>
                                    <Input
                                        id="available_from"
                                        type="date"
                                        value={data.available_from}
                                        onChange={(e) => setData('available_from', e.target.value)}
                                    />
                                    {errors.available_from && <p className="text-sm text-red-600 mt-1">{errors.available_from}</p>}
                                </div>

                                {/* Duration */}
                                <div>
                                    <Label htmlFor="duration_months">Internship Duration (months)</Label>
                                    <Input
                                        id="duration_months"
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={data.duration_months}
                                        onChange={(e) => setData('duration_months', e.target.value)}
                                        placeholder="e.g., 3"
                                    />
                                    {errors.duration_months && <p className="text-sm text-red-600 mt-1">{errors.duration_months}</p>}
                                </div>

                                {/* Why Internship */}
                                <div>
                                    <Label htmlFor="why_internship">Why do you want to intern with us? (Max 1000 characters)</Label>
                                    <textarea
                                        id="why_internship"
                                        value={data.why_internship}
                                        onChange={(e) => setData('why_internship', e.target.value)}
                                        placeholder="Tell us about your motivation and what you hope to learn..."
                                        className="w-full border rounded-md px-3 py-2 min-h-[120px]"
                                        maxLength={1000}
                                    />
                                    {errors.why_internship && <p className="text-sm text-red-600 mt-1">{errors.why_internship}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 text-lg"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
