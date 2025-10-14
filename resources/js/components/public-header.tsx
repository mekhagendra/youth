import TopBar from '@/components/top-bar';
import Navbar from '@/components/navbar';

interface PublicHeaderProps {
    user?: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    } | null;
}

export default function PublicHeader({ user }: PublicHeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <TopBar user={user} />
            <Navbar user={user} />
        </header>
    );
}