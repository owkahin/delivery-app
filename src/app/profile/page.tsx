'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaHistory, FaMapMarkerAlt, FaCreditCard, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="pb-24 min-h-screen bg-[var(--primary)] flex items-center justify-center">
        <div className="text-black text-xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="pb-24 min-h-screen bg-[var(--primary)] text-black">
      {/* Header */}
      <div className="p-8 text-center pt-16">
        <h1 className="text-xl font-bold mb-8">Profile</h1>

        <div className="w-24 h-24 bg-yellow-400 mx-auto rounded-full flex items-center justify-center border-4 border-white mb-4 overflow-hidden relative shadow-lg">
          <FaUser className="text-4xl text-black opacity-50" />
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-black/70">{user.email}</p>
      </div>

      {/* Menu Options */}
      <div className="bg-white dark:bg-black dark:text-white rounded-t-[3rem] p-8 min-h-[500px]">
        <div className="flex flex-col gap-2">
          <Link href="/profile/edit" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-[var(--primary)] transition">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <FaUser />
            </div>
            <span className="font-bold text-lg">My Profile</span>
          </Link>

          <Link href="/orders" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <FaCreditCard />
            </div>
            <span className="font-bold text-lg">My Orders</span>
          </Link>

          <Link href="/history" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <FaHistory />
            </div>
            <span className="font-bold text-lg">Order History</span>
          </Link>

          <Link href="/support" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <FaQuestionCircle />
            </div>
            <span className="font-bold text-lg">Support & Help</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition text-left w-full mt-4 text-red-600 dark:text-red-400"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <FaSignOutAlt />
            </div>
            <span className="font-bold text-lg">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

