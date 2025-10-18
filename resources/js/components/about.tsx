import React from 'react';
import { Button } from '@/components/ui/button';
import { 
    Users, 
    Target, 
    TrendingUp
} from 'lucide-react';

const About = () => {
    return (
        <section className="bg-gray-50">
            <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 mx-auto py-5">
                <div className="md:col-span-2">
                    <div className="text-left ">
                        <h4 className="text-2xl font-bold text-black mb-4 mt-4">
                        KNOW ABOUT US
                        </h4>
                    </div>

                    <div className=" gap-8 mb-16">
                        <h2 className="text-5xl font-bold text-green-700 my-10">
                        We help in Youth's capacity development.
                        </h2>
                        <p className="text-xl text-black mb-10">
                        Youth Initiative (YI) is a youth organization working for the capacity 
                        development of youths in Nepal. 
                        <br />
                        Established in 1999, YI was formally 
                        registered with the District Administration Office, Kathmandu in April 2001. It is affiliated with Social Welfare Council (SWC) of Nepal.
                        </p>
                    </div>
                    <div className="flex justify-left mt-4 px-4">
                        <Button 
                        size="lg"
                        variant="outline"
                        className="bg-green-700 text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-lg text-lg flex items-center"
                        style={{ border: '2px solid green' }}
                        >
                        <span>Learn More</span>
                        </Button>
                    </div>
                </div>
                {/* Video Section */}
                <div className="md:col-span-1">
                    <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                        <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                        src="https://youtube.com/embed/MOAF_Ac298Q"
                        title="Youth Initiative Impact Story"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        >
                        </iframe>
                    </div>
                </div>
            </div>
            
            
            <div className="grid md:grid-cols-3 gap-8">
                    {/* Inform */}
                    <div className="text-center p-8 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                        <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Inform</h3>
                        <p className="text-gray-600">
                            Inform young people about the global, national and local issues and 
                            concerns that affects their everyday living.
                        </p>
                    </div>
                    
                    {/* Empower */}
                    <div className="text-center p-8 bg-green-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                        <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <TrendingUp className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Empower</h3>
                        <p className="text-gray-600">
                            Empower young people by organizing them into a group of critical mass, 
                            increasing their access and control over resources.
                        </p>
                    </div>
                    
                    {/* Involve */}
                    <div className="text-center p-8 bg-purple-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                        <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Involve</h3>
                        <p className="text-gray-600">
                            Involve young people by increasing youth representation in governance of 
                            all political and social institutions at national and sub national level.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;