import { FiBell, FiSearch } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-[var(--secondary-dark-blue)] px-4 py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[var(--accent-bright-yellow)]">Hi, John</h1>
          <FiBell className="h-6 w-6 text-[var(--accent-bright-yellow)]" />
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--gray)]" />
          <input
            type="text"
            placeholder="Search for food, groceries, packages..."
            className="w-full p-3 pl-10 border border-[var(--gray)] rounded-md bg-[var(--white)] text-[var(--black)]"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
