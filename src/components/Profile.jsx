import React from "react";
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#07263A] text-white antialiased">
      <header className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div />
        <h1 className="font-semibold text-lg">Profile</h1>
        <div className="w-8" />
      </header>

      <main className="max-w-xl mx-auto px-4 space-y-4 pb-24">
        <section className="bg-white text-black rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            <img src="https://picsum.photos/seed/avatar/200" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg">Shahdin Iqbal</div>
            <div className="text-sm text-gray-600">shahdin@example.com</div>
            <div className="mt-2 text-sm text-gray-600">California, US</div>
          </div>
          <button className="bg-[#FFC700] text-black px-3 py-2 rounded-lg font-medium" onClick={() => console.log('Edit profile')}>
            Edit
          </button>
        </section>

        <section className="bg-white text-black rounded-2xl p-3 shadow-sm">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-semibold">24</div>
              <div className="text-sm text-gray-600">Orders</div>
            </div>
            <div>
              <div className="font-semibold">5</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
            <div>
              <div className="font-semibold">ETB 20,480</div>
              <div className="text-sm text-gray-600">Saved</div>
            </div>
          </div>
        </section>

        <section className="bg-white text-black rounded-2xl p-1 shadow-sm divide-y">
          {[
            { key: "my", label: "My Profile", meta: "", href: "/profile" },
            { key: "orders", label: "Orders", meta: "24", href: "/orders" },
            { key: "cart", label: "My Cart", meta: "", href: "/cart" },
            { key: "vouchers", label: "Vouchers", meta: "2", href: "/vouchers" },
            { key: "help", label: "Help & Support", meta: "", href: "/help" },
            { key: "settings", label: "Settings", meta: "", href: "/settings" },
          ].map((item) => (
            <Link href={item.href} key={item.key}>
              <button className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0B394D] flex items-center justify-center text-[#FFC700]">
                    {/* icon placeholder */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" /><path d="M4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4z" /></svg>
                  </div>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    {item.meta && <div className="text-sm text-gray-500">{item.meta}</div>}
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </button>
            </Link>
          ))}
        </section>

        <section className="bg-white text-black rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">App version</div>
              <div className="font-medium">1.0.0</div>
            </div>
            <button className="text-sm text-gray-600" onClick={() => console.log('Check for updates')}>Check for updates</button>
          </div>

          <div className="mt-4">
            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold" onClick={() => console.log('Logout')}>Logout</button>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#07263A] w-[94%] max-w-xl rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        <Link href="/"><button className="text-[#A9BAC6]">Home</button></Link>
        <Link href="/orders"><button className="text-[#A9BAC6]">Orders</button></Link>
        <Link href="/tracking"><button className="text-[#A9BAC6]">Track</button></Link>
        <Link href="/profile"><button className="text-[#FFC700] font-semibold">Profile</button></Link>
      </nav>
    </div>
  );
}