import React from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), { ssr: false });

export default function Tracking() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#07263A] text-white antialiased">
      <header className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button className="p-2 rounded-lg bg-[#0B394D]" onClick={() => router.back()}>
          <svg className="w-5 h-5 text-[#FFC700]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-semibold text-lg">Track Order</h1>
        <div className="w-8" />
      </header>

      <main className="max-w-xl mx-auto px-4 space-y-4">
        <section className="bg-white text-black rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-gray-200 overflow-hidden">
              <img src="https://picsum.photos/seed/delivery/200/200" alt="rider" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Rider: Sam</div>
              <div className="text-sm text-gray-600">Scooter • 5 min away</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">ETA</div>
              <div className="font-semibold">12:08 PM</div>
            </div>
          </div>
        </section>

        <section className="bg-white text-black rounded-2xl p-4 shadow-sm min-h-[300px] flex flex-col">
          <div className="flex-1 flex items-center justify-center relative w-full h-[300px] overflow-hidden rounded-lg">
            <Map />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Order: Jumbo Burger</div>
            <button className="bg-[#FFC700] text-black px-4 py-2 rounded-lg font-medium" onClick={() => console.log('Contact Rider')}>Contact Rider</button>
          </div>
        </section>

        <section className="bg-white text-black rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-gray-600">Progress</div>
          <div className="mt-3 space-y-3">
            {[
              { t: "Accepted", done: true },
              { t: "Preparing", done: true },
              { t: "Out for delivery", done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${s.done ? "bg-[#2ECC71]" : "bg-gray-300"}`} />
                <div className={`${s.done ? "font-medium" : "text-gray-600"}`}>{s.t}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[94%] max-w-xl">
          <button className="w-full bg-[#FFC700] text-black py-3 rounded-xl font-semibold" onClick={() => console.log('Track Live')}>Track Live</button>
        </div>
      </main>
    </div>
  );
}