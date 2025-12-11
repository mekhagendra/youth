import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, Briefcase, MessageSquare, Image, MapPin, Target, UserCircle } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { auth } = usePage().props as any;
    const userType = auth?.user?.user_type || 'Guest';
    
    // Check if user has admin privileges
    const isAdmin = userType === 'System Admin' || userType === 'System Manager';
    const isMember = userType === 'Member' || userType === 'Volunteer' || userType === 'Intern' || userType === 'Employee';

    // Define nav items based on user type
    const getNavItems = (): NavItem[] => {
        const items: NavItem[] = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ];

        // System Admin and System Manager have access to everything
        if (isAdmin) {
            items.push(
                {
                    title: 'Volunteer Applications',
                    href: '/admin/volunteer-applications',
                    icon: Users,
                },
                {
                    title: 'Internship Applications',
                    href: '/admin/internship-applications',
                    icon: Briefcase,
                },
                {
                    title: 'Voice of Changes',
                    href: '/admin/voice-of-changes',
                    icon: MessageSquare,
                },
                {
                    title: 'User Management',
                    href: '/admin/users',
                    icon: Users,
                },
                {
                    title: 'Team Management',
                    href: '/admin/teams',
                    icon: Users,
                },
                {
                    title: 'Member Management',
                    href: '/admin/members',
                    icon: Users,
                },
                {
                    title: 'Resource Management',
                    href: '/admin/resources',
                    icon: Briefcase,
                },
                {
                    title: 'Working Areas',
                    href: '/admin/working-areas',
                    icon: MapPin,
                },
                {
                    title: 'Supporter Management',
                    href: '/admin/supporters',
                    icon: Target,
                },
                {
                    title: 'Activity Management',
                    href: '/admin/activities',
                    icon: Briefcase,
                },
                {
                    title: 'Gallery Management',
                    href: '/admin/gallery',
                    icon: Image,
                }
            );
        } 
        // Members, Volunteers, Interns, and Employees can manage content and submit voice of changes
        else if (isMember) {
            items.push(
                {
                    title: 'My Messages',
                    href: '/voice-of-changes',
                    icon: MessageSquare,
                },
                {
                    title: 'My Profile',
                    href: '/settings/profile',
                    icon: UserCircle,
                }
            );
        }
        // Guest users can only access profile
        else {
            items.push(
                {
                    title: 'My Profile',
                    href: '/settings/profile',
                    icon: UserCircle,
                }
            );
        }

        return items;
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
