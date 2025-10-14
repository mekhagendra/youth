import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { 
    Menu, 
    X, 
    ChevronDown,
    Users,
    Target,
    Activity,
    MapPin,
    UserPlus,
    Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
    user?: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    } | null;
}

const navigationItems = [
    {
        title: 'HOME',
        href: '/'
    },
    {
        title: 'ABOUT',
        href: '/about',
        subItems: [
            { title: 'Our Story', href: '/about/story' },
            { title: 'Our Team', href: '/about/team' },
        ]
    },
    {
        title: 'ACTIVITIES',
        href: '/activities',
        subItems: [
            { title: 'Recent Programs', href: '/activities/recent' },
            { title: 'Ongoing Projects', href: '/activities/ongoing' },
            { title: 'Success Stories', href: '/activities/success' },
        ]
    },
    {
        title: 'WORKING AREAS',
        href: '/working-areas',
    },
    {
        title: 'OPPORTUNITIES',
        href: '/opportunities',
        subItems: [
            { title: 'Volunteer', href: '/opportunities/volunteer' },
            { title: 'Internship', href: '/opportunities/internship' },
            { title: 'Careers', href: '/opportunities/careers' },
            { title: 'YI Awards Application', href: '/opportunities/yiawards' },
        ]
    },
    {
        title: 'RESOURCES',
        href: '/resources',
    },
    {
        title: 'CONTACT',
        href: '/contact',
    }
];

export default function Navbar({ user }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleDropdownToggle = (title: string) => {
        setActiveDropdown(activeDropdown === title ? null : title);
    };

    return (
        <nav className="bg-white shadow-lg border-b-2 border-blue-600">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo and Navigation Container */}
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img 
                                src="/youthlogo.png" 
                                alt="Youth Logo" 
                                className="h-20 w-30 object-contain"
                            />
                        </div>

                        {/* Desktop Navigation - Now positioned after logo */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navigationItems.map((item) => (
                                <div key={item.title} className="relative group">
                                    {item.subItems ? (
                                        <div className="relative">
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1"
                                                onClick={() => handleDropdownToggle(item.title)}
                                            >
                                                <span className="font-medium">{item.title}</span>
                                                <ChevronDown className={cn(
                                                    "h-4 w-4 transition-transform duration-200",
                                                    activeDropdown === item.title && "rotate-180"
                                                )} />
                                            </Button>
                                            
                                            {/* Dropdown Menu */}
                                            <div className={cn(
                                                "absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                                            )}>
                                                {item.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.title}
                                                        href={subItem.href}
                                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                    >
                                                        {subItem.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 font-medium"
                                        >
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side content - Empty for now, you can add user menu or CTA buttons here */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Add user authentication links or CTA buttons here if needed */}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-2">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    {item.subItems ? (
                                        <div>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-between text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg"
                                                onClick={() => handleDropdownToggle(item.title)}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium">{item.title}</span>
                                                </div>
                                                <ChevronDown className={cn(
                                                    "h-4 w-4 transition-transform duration-200",
                                                    activeDropdown === item.title && "rotate-180"
                                                )} />
                                            </Button>
                                            
                                            {activeDropdown === item.title && (
                                                <div className="ml-6 mt-2 space-y-1">
                                                    {item.subItems.map((subItem) => (
                                                        <Link
                                                            key={subItem.title}
                                                            href={subItem.href}
                                                            className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}