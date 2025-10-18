import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

interface TopBarProps {
    user?: unknown;
}

const TopBar: React.FC<TopBarProps> = () => {
    return (
        <div className="bg-green-700 text-white py-2 text-sm">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    {/* Contact Information */}
                    <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>+977-1-XXXXXXX</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>info@youthinitiative.org.np</span>
                        </div>
                    </div>

                    {/* Office Hours and Location */}
                    <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Sun-Fri: 10AM-5PM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>Kathmandu, Nepal</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;