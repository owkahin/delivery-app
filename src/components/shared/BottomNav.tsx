import Link from 'next/link';
import { FiHome, FiClipboard, FiUser } from 'react-icons/fi';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--white)] shadow-t-md md:hidden">
      <div className="container mx-auto px-4 py-2 flex justify-around">
        <Link href="/" className="text-[var(--primary-brand-yellow)] flex flex-col items-center">
          <FiHome className="h-6 w-6 mx-auto" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/orders" className="text-[var(--gray)] hover:text-[var(--primary-brand-yellow)] flex flex-col items-center">
          <FiClipboard className="h-6 w-6 mx-auto" />
          <span className="text-xs">Orders</span>
        </Link>
        <Link href="/profile" className="text-[var(--gray)] hover:text-[var(--primary-brand-yellow)] flex flex-col items-center">
          <FiUser className="h-6 w-6 mx-auto" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
