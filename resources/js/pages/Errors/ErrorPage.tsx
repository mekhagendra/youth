import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Home, ArrowLeft } from 'lucide-react';

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
                    title: title || "Page Not Found",
                    message: message || "The page you are looking for does not exist or has been moved.",
                };
            case 403:
                return {
                    title: title || "Access Denied",
                    message: message || "You do not have permission to access this resource.",
                };
            case 500:
                return {
                    title: title || "Server Error",
                    message: message || "An internal server error occurred. Please try again later.",
                };
            case 503:
                return {
                    title: title || "Service Unavailable",
                    message: message || "The service is temporarily unavailable. Please try again shortly.",
                };
            default:
                return {
                    title: title || "Error",
                    message: message || "An unexpected error occurred.",
                };
        }
    };

    const errorContent = getErrorContent();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <Head title={errorContent.title} />
            
            <div className="max-w-md w-full text-center">
                {/* Error Code */}
                <div className="mb-8">
                    <h1 className="text-8xl font-light text-gray-300 mb-2">
                        {status}
                    </h1>
                </div>

                {/* Main Title */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {errorContent.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-12 leading-relaxed">
                    {errorContent.message}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;