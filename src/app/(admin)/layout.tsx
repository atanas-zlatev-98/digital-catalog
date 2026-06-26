import NavigationBar from '@/components/shared/navigation-bar/NavigationBar';
import { auth } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const session = await auth()
    console.log('AdminLayout session:', session);
    return (
        <>
            <NavigationBar user={session?.user} />
            {children}
        </>
    )
}