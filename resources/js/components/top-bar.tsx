import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { 
    Menu, 
    X, 
    Phone, 
    Mail, 
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from 'lucide-react';

interface TopBarProps {
    user?: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    } | null;
}

export default function TopBar({ user }: TopBarProps) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2 text-sm">
                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-2 md:mb-0">
                        <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>(+977)-01-4770641</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>info@youth.org.np</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>Kathmandu, Nepal</span>
                        </div>
                    </div>
                    
                    {/* Social Links & Donation */}
                    <div className="flex items-center gap-4">
                        <div className="h-4 w-px bg-white/30"></div>
                        <Button 
                            size="sm" 
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-3 py-1"
                        >
                            DONATION
                        </Button>
                        <div className="flex items-center gap-2">
                            <a 
                                href="https://www.facebook.com/yinepal" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 transition-colors"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a 
                                href="https://x.com/tweet4youth" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 transition-colors"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a 
                                href="#" 
                                className="hover:text-blue-200 transition-colors"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a 
                                href="#" 
                                className="hover:text-blue-200 transition-colors"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}