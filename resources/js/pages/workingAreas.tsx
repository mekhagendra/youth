import { Head, Link, usePage } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';
import { PageProps } from '@/types';

interface WorkingArea {
    title: string;
    description: string;
    image_url: string | null;
}

interface WorkingAreasProps extends PageProps {
    workingArea: WorkingArea;
}

export default function WorkingAreas() {
    const { workingArea } = usePage<WorkingAreasProps>().props;

    return (
        <>
            <Head title={`Working Areas - ${workingArea.title}`} />
            <PublicHeader />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section with Title */}
                
                    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4">
                        <div className="text-left">
                            <p className="text-sm uppercase tracking-wide mb-2 pt-8">Working Areas</p>
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold">
                                {workingArea.title}
                            </h1>
                        </div>
                    </div>
                
                
                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Image Section */}
                        {workingArea.image_url && (
                            <div className="order-1 lg:order-1">
                                <div className="rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                        src={workingArea.image_url}
                                        alt={workingArea.title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Description Section */}
                        <div className={`order-2 lg:order-2 ${!workingArea.image_url ? 'lg:col-span-2' : ''}`}>
                            <div className="prose prose-lg max-w-none">
                                <div
                                    className="text-gray-700 leading-relaxed text-md md:text-md lg:text-lg font-semibold"
                                    dangerouslySetInnerHTML={{ __html: workingArea.description }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Get Involved
                            </Link>
                            <Link
                                href="/opportunities/volunteer"
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-lg"
                            >
                                Volunteer With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
