import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Home, ArrowLeft, Search, RefreshCw, MapPin } from 'lucide-react';

interface ErrorPageProps {
    status: number;
    message?: string;
    title?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ status, message, title }) => {
    const getErrorContent = () => {
        switch (status) {
            case 404:
                return {
                    title: title || "Oops! Page Not Found",
                    message: message || "The page you're looking for seems to have wandered off into the digital wilderness.",
                    icon: "🕵️‍♀️",
                    subtitle: "Error 404",
                    description: "Don't worry, even the best explorers sometimes take a wrong turn. Let's get you back on track!",
                    suggestions: [
                        "Check if you typed the URL correctly",
                        "The page might have been moved or deleted",
                        "Try searching for what you need",
                        "Go back to our homepage"
                    ]
                };
            case 403:
                return {
                    title: title || "Access Denied",
                    message: message || "You don't have permission to access this area.",
                    icon: "🚫",
                    subtitle: "Error 403",
                    description: "This area is restricted. You might need special permissions or to log in with a different account.",
                    suggestions: [
                        "Make sure you're logged in with the right account",
                        "Contact an administrator if you think this is a mistake",
                        "Check if you have the necessary permissions",
                        "Return to the homepage"
                    ]
                };
            case 500:
                return {
                    title: title || "Server Error",
                    message: message || "Something went wrong on our end.",
                    icon: "⚡",
                    subtitle: "Error 500",
                    description: "Our server encountered an unexpected error. Our team has been notified and we're working on a fix.",
                    suggestions: [
                        "Try refreshing the page",
                        "Wait a few minutes and try again",
                        "Clear your browser cache",
                        "Contact support if the problem persists"
                    ]
                };
            case 503:
                return {
                    title: title || "Service Unavailable",
                    message: message || "We're temporarily down for maintenance.",
                    icon: "🔧",
                    subtitle: "Error 503",
                    description: "We're making some improvements! The site will be back up and running shortly.",
                    suggestions: [
                        "Try again in a few minutes",
                        "Follow us on social media for updates",
                        "Check our status page",
                        "Thank you for your patience"
                    ]
                };
            default:
                return {
                    title: title || "Something Went Wrong",
                    message: message || "An unexpected error occurred.",
                    icon: "🤔",
                    subtitle: `Error ${status}`,
                    description: "We encountered an unexpected issue. Let's try to get you back on track.",
                    suggestions: [
                        "Try refreshing the page",
                        "Go back to the previous page",
                        "Return to our homepage",
                        "Contact support if needed"
                    ]
                };
        }
    };

    const errorContent = getErrorContent();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <Head title={errorContent.title} />
            
            <div className="max-w-4xl w-full text-center">
                {/* Animated Error Icon */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg border-4 border-blue-100 animate-bounce">
                        <span className="text-6xl">{errorContent.icon}</span>
                    </div>
                </div>

                {/* Error Code */}
                <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium tracking-wide uppercase">
                        {errorContent.subtitle}
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    {errorContent.title}
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    {errorContent.description}
                </p>

                {/* Suggestions Box */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 max-w-2xl mx-auto border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
                        <Search className="w-5 h-5 mr-2 text-blue-600" />
                        Here's what you can try:
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                        {errorContent.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                                    {index + 1}
                                </span>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go Home
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                    
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-8 py-4 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Try Again
                    </button>
                </div>

                {/* Footer Message */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-gray-500 flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Lost? Our{' '}
                        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium mx-1">
                            homepage
                        </Link>
                        is always a safe place to start.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                    <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;