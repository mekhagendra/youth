import React, { useState, useEffect } from 'react';

interface Supporter {
    id: number;
    name: string;
    src: string;
    website_url?: string;
}

const Supporter: React.FC = () => {
    const [supporters, setSupporters] = useState<Supporter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch supporters from API
    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/supporters');
                if (!response.ok) {
                    throw new Error('Failed to fetch supporters');
                }
                const data = await response.json();
                setSupporters(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching supporters:', err);
                // Fallback to empty array if API fails
                setSupporters([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSupporters();
    }, []);
    // Don't render if no supporters and not loading
    if (!loading && supporters.length === 0 && !error) {
        return null;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-5">
                <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-lg font-medium">OUR SUPPORTERS</h1>
                    <hr className="flex-1 border-t-2 border-gray-300" />
                </div>

                {loading && <p className="text-center text-gray-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="flex flex-wrap justify-center sm:justify-evenly gap-4 sm:gap-6">
                    {supporters.map((s, i) => (
                    <img key={i} src={s.src} alt={`supporter-${i}`} className="h-10 sm:h-12 object-contain" />
                    ))}
                </div>
            </div>
            
        </section>
    );
};

export default Supporter;
