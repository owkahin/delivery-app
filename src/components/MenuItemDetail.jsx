import React, { useState } from "react";

export default function MenuItemDetail() {
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Regular");
  const [notes, setNotes] = useState("");
  const basePrice = 1054.40; // 6.59 * 160
  const sizeMultiplier = { Small: 0.9, Regular: 1, Large: 1.35 };
  const price = (basePrice * sizeMultiplier[selectedSize] * qty).toFixed(2);

  function addToCart() {
    console.log("Add to cart:", {
      item: "Jumbo Burger",
      size: selectedSize,
      qty,
      notes,
      total: price,
    });
    alert(`Added ${qty} × Jumbo Burger (${selectedSize}) — ETB ${price}`);
  }

  return (
    <div className="min-h-screen bg-[#07263A] text-white antialiased">
      <header className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button aria-label="Back" className="p-2 rounded-lg bg-[#0B394D]">
          <svg className="w-5 h-5 text-[#FFC700]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-semibold text-lg">Item</h1>
        <button aria-label="Favorite" className="p-2 rounded-lg bg-[#0B394D]">
          <svg className="w-5 h-5 text-[#FFC700]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.13 2.44C11.09 5 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 pb-32 space-y-4">
        <section className="bg-white text-black rounded-2xl p-0 overflow-hidden shadow-sm">
          <div className="w-full h-52 overflow-hidden">
            <img src="https://picsum.photos/seed/menuitem/800/600" alt="Jumbo Burger" className="w-full h-full object-cover" />
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Jumbo Burger</h2>
                <div className="text-sm text-gray-600 mt-1">Cheesy Mozzarella • Beef • Signature</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Price</div>
                <div className="text-xl font-semibold">ETB {(basePrice * sizeMultiplier[selectedSize]).toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-600">Choose size</div>
              <div className="mt-2 flex gap-2">
                {["Small", "Regular", "Large"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-2 rounded-lg text-sm ${selectedSize === s ? "bg-[#FFC700] text-black" : "bg-[#F3F6F8] text-black"}`}
                    aria-pressed={selectedSize === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-600">Special instructions</div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes (e.g., no onions)"
                className="mt-2 w-full rounded-lg border border-gray-200 text-sm p-2"
                rows={3}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-[#F3F6F8] text-black rounded-lg px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 rounded-md bg-white/60"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="px-3 font-medium">{qty}</div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-1 rounded-md bg-white/60"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-lg font-semibold">ETB {price}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium">Reviews</div>
              <div className="mt-2 flex items-center gap-3">
                <div className="inline-flex items-center gap-1 bg-[#FFFAE0] text-[#B37A00] px-2 py-1 rounded text-sm">
                  ★ 4.6
                </div>
                <div className="text-sm text-gray-600">• 128 reviews</div>
              </div>

              <div className="mt-3 space-y-3">
                <div className="text-sm text-gray-700 bg-[#F8F9FA] p-3 rounded">
                  "Really juicy burger, loved the cheese — came hot and fresh."
                </div>
                <div className="text-sm text-gray-700 bg-[#F8F9FA] p-3 rounded">
                  "Good value for money. Fries were nice and crispy."
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[94%] max-w-xl">
        <div className="bg-[#07263A] px-4 py-3 rounded-xl flex items-center justify-between shadow-lg">
          <div className="text-white">
            <div className="text-sm text-gray-400">Total</div>
            <div className="text-lg font-semibold">ETB {price}</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={addToCart}
              className="bg-[#FFC700] text-black px-5 py-3 rounded-lg font-semibold"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}