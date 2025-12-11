import { Head, useForm } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';
import { MapPin, Phone, Mail, Send} from 'lucide-react';
import { FormEvent } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                alert('Thank you for your message! We will get back to you soon.');
            },
        });
    };

    return (
        <>
            <Head title="Contact Us - Youth Initiative Nepal" />
            <PublicHeader />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-green-700 to-green-300 text-white pt-4 pb-2">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
                        <p> Have questions or want to get involved? We'd love to hear from you. Reach out and let's make a difference together.</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Information Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Location Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                                            <MapPin className="h-6 w-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                                        <p className="text-gray-600">
                                            Koteshwor <br />
                                            Kathmandu, Nepal 
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                                            <Phone className="h-6 w-6 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                                        <p className="text-gray-600">
                                            <a href="tel:+9771234567890" className="hover:text-blue-600 transition-colors">
                                                +977-01-4770641
                                            </a><br />
                                            <a href="tel:+9779841234567" className="hover:text-blue-600 transition-colors">
                                                +977-01-4770733

                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100">
                                            <Mail className="h-6 w-6 text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                                        <p className="text-gray-600">
                                            <a href="mailto:info@youthinitiative.org.np" className="hover:text-blue-600 transition-colors break-all py-4">
                                                info@youthinitiative.org.np 
                                            </a><br />
                                            <a href="mailto:info@youthinitiative.org.np" className="hover:text-blue-600 transition-colors break-all">
                                                info@youth.org.np
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Social Media */}
                            <div className="bg-gradient-to-r from-green-700 to-green-300 rounded-xl shadow-lg p-6 text-white">
                                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                        aria-label="Facebook"
                                    >
                                        <FaFacebook className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                        aria-label="Twitter"
                                    >
                                        <FaTwitter className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                        aria-label="Instagram"
                                    >
                                        <FaInstagram className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>


                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Please enter Your Full Name"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email and Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="please enter your email address"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Please enter your phone number"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-700 to-green-300 hover:from-green-800 hover:to-green-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                    >
                                        <Send className="h-5 w-5" />
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="mt-16">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 bg-gradient-to-r from-green-700 to-green-300">
                                <h2 className="text-2xl font-bold text-white">Find Us on Map</h2>
                            </div>
                            <div className="aspect-video w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2341611675884!2d85.3342915764402!3d27.67915672673246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a40096e621%3A0x6226239341338c84!2sYouth%20Initiative!5e0!3m2!1sen!2sau!4v1760613371766!5m2!1sen!2sau"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 bg-gradient-to-r from-green-700 to-green-300 rounded-xl shadow-lg p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                        <p className="text-xl mb-8 text-blue-100">
                            Join us in our mission to empower youth and transform communities across Nepal.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/members/signup"
                                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                                Become a Member
                            </a>
                            <a
                                href="/opportunities/volunteer"
                                className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                            >
                                Volunteer With Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
