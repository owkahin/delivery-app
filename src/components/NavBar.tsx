'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaHeart, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function NavBar() {
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t dark:border-gray-800 p-4 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
            <Link href="/" className={`${pathname === '/' ? 'bg-black text-white p-3 rounded-full' : 'text-gray-400'} transition-all`}>
                <FaHome size={24} />
            </Link>
            <Link href="/wishlist" className={`${pathname === '/wishlist' ? 'bg-black text-white p-3 rounded-full' : 'text-gray-400'} transition-all`}>
                <FaHeart size={24} />
            </Link>
            <div className="bg-[var(--primary)] p-4 rounded-full -mt-8 border-4 border-white dark:border-black cursor-pointer shadow-lg">
                <span className="text-black font-bold text-xl">scan</span>
            </div>
            <Link href="/location" className={`${pathname === '/location' ? 'bg-black text-white p-3 rounded-full' : 'text-gray-400'} transition-all`}>
                <FaMapMarkerAlt size={24} />
            </Link>
            <Link href={user ? "/profile" : "/login"} className={`${pathname === '/profile' ? 'bg-black text-white p-3 rounded-full' : 'text-gray-400'} transition-all relative`}>
                <FaUser size={24} />
                {user && <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>}
            </Link>
        </div>
    );
}
