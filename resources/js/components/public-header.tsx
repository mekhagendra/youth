import Navbar from '@/components/navbar';
import TopBar from '@/components/top-bar';
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
        <>
        <TopBar />
        <header className="sticky top-0 left-0 right-0 z-50">
        <Navbar user={user} />
        </header>
        </>

        
    );
}