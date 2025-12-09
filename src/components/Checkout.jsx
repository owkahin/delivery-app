import React from "react";

export default function Checkout() {
  const items = [
    { id: 1, name: "Beef Burger", qty: 1, price: 6.59 },
    { id: 2, name: "Fries", qty: 1, price: 2.49 }
  ];

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const deliveryFee = 2.5;
  const total = (subtotal + deliveryFee).toFixed(2);

  return (
    <div className="min-h-screen bg-[#07263A] text-white antialiased">
      <header className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button className="p-2 rounded-lg bg-[#0B394D]">
          <svg className="w-5 h-5 text-[#FFC700]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-semibold text-lg">Checkout</h1>
        <div className="w-8" />
      </header>

      <main className="max-w-xl mx-auto px-4 space-y-4">
        <section className="bg-white text-black rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium">Delivery</h2>
          <p className="text-sm text-gray-600 mt-2">Home • 742 Evergreen Terrace, Springfield</p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <div>
              <div className="text-xs text-gray-500">Estimated</div>
              <div className="font-semibold">ASAP (25-35 min)</div>
            </div>
            <button className="bg-[#FFC700] px-3 py-2 rounded-lg font-medium text-black">Change</button>
          </div>
        </section>

        <section className="bg-white text-black rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium">Order</h2>
          <ul className="mt-3 space-y-3">
        </section>
      </main>
    </div>
  );
}