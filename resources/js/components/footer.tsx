import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin,
    Heart
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: About & Socials */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-green-700 font-bold mb-4">
                                Youth Initiative
                            </h3>
                            <p className="text-black leading-relaxed mb-4">
                                Empowering youth across Nepal through capacity development, 
                                skills training, and innovative programs since 1999.
                            </p>
                            <div className="space-y-4">
                            <h4 className="text-black font-medium">Follow Us</h4>
                            <div className="flex space-x-3">
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors duration-200"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-green-700 font-bold mb-4">
                            Quick Links
                        </h3>

                        <div className="space-y-3">
                            <ul className="space-y-2">
                                <li>
                                    <Link 
                                        href="/" 
                                        className="text-black font-bold hover:text-green-400 transition-colors duration-200 flex items-center"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/about" 
                                        className="text-black font-bold hover:text-green-400 transition-colors duration-200 flex items-center"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/activities" 
                                        className="text-black font-bold hover:text-green-400 transition-colors duration-200 flex items-center"
                                    >
                                        Activities
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/gallery" 
                                        className="text-black font-bold hover:text-green-400 transition-colors duration-200 flex items-center"
                                    >
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/contact" 
                                        className="text-black font-bold hover:text-green-400 transition-colors duration-200 flex items-center"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Column 3: Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-green-700 font-bold mb-4">
                            Contact Us
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-black font-medium">Head Office</p>
                                    <p className="text-black text-sm leading-relaxed">
                                        Kathmandu, Nepal<br />
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-green-400" />
                                <div>
                                    <p className="text-black font-medium">Phone</p>
                                    <p className="text-black text-sm">+977-1-4770641</p>
                                    <p className="text-black text-sm">+977-1-4770733</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-green-400" />
                                <div>
                                    <p className="text-black font-medium">Email</p>
                                    <p className="text-black text-sm">info@youthinitiative.org.np</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column Map */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-green-700 font-bold mb-4">
                            Find Us
                        </h3>
                            <div className="rounded-lg overflow-hidden border-2 border-green-400/20">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2341611675884!2d85.3342915764402!3d27.67915672673246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a40096e621%3A0x6226239341338c84!2sYouth%20Initiative!5e0!3m2!1sen!2sau!4v1760613371766!5m2!1sen!2sau"
                                    width="100%"
                                    height="180"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Youth Initiative Kathmandu, Nepal"
                                    className="rounded-md"
                                ></iframe>
                            </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700 bg-gray-900/80">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-gray-400 text-sm">
                                © 2024 Youth Initiative. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Privacy Policy
                                </a>
                                <span className="text-gray-600">|</span>
                                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Terms of Service
                                </a>
                                <span className="text-gray-600">|</span>
                                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Sitemap
                                </a>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>for Nepal's Youth</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;