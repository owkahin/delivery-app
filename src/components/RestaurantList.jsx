import React from "react";

const restaurants = [
  {
    id: 1,
    name: "Jumbo Burger",
    cuisine: "Burgers • Fast Food",
    eta: "25-30 min",
    fee: "ETB 400",
    rating: 4.6,
    img: "https://picsum.photos/seed/rest1/400/300"
  },
  {
    id: 2,
    name: "Pasta Palace",
    cuisine: "Italian • Pasta",
    eta: "30-40 min",
    fee: "ETB 480",
    rating: 4.4,
    img: "https://picsum.photos/seed/rest2/400/300"
  },
  {
    id: 3,
    name: "Green Bowl",
    cuisine: "Vegan • Healthy",
    eta: "20-25 min",
    fee: "ETB 240",
    rating: 4.8,
    img: "https://picsum.photos/seed/rest3/400/300"
  }
];

export default function RestaurantList() {
  return (
    <div className="min-h-screen bg-[#07263A] text-white antialiased">
      <header className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button className="p-2 rounded-lg bg-[#0B394D]">
          <svg className="w-5 h-5 text-[#FFC700]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-semibold text-lg">Restaurants</h1>
        <div className="w-8" />
      </header>

      <main className="max-w-xl mx-auto px-4">
        <div className="bg-white text-black rounded-2xl p-3 shadow-sm flex items-center gap-3">
          <input
            aria-label="Search restaurants"
            className="flex-1 px-3 py-2 rounded-lg outline-none"
            placeholder="Find food or restaurant"
          />
          <button className="ml-2 bg-[#FFC700] px-3 py-2 rounded-lg font-semibold">Search</button>
        </div>

        <div className="mt-4 overflow-x-auto -mx-1 px-1">
          <div className="flex gap-3">
            {["All", "Fast Food", "Italian", "Vegan", "Dessert"].map((c, i) => (
              <button
                key={i}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${i === 0 ? "bg-[#FFC700] text-black" : "bg-[#0B394D] text-[#A9BAC6]"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-5 grid gap-4">
          {restaurants.map((r) => (
            <article key={r.id} className="bg-white text-black rounded-xl overflow-hidden shadow-sm flex">
              <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{r.name}</h3>
                    <div className="text-sm text-gray-600 mt-1">{r.cuisine}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{r.eta}</div>
                    <div className="mt-1 inline-flex items-center gap-1 bg-[#F3F6F8] text-xs text-black px-2 py-1 rounded">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>
                      {r.fee}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1 bg-[#FFFAE0] text-[#B37A00] px-2 py-1 rounded text-sm">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      {r.rating}
                    </div>
                    <span className="text-sm text-gray-500">• Popular</span>
                  </div>

                  <button className="bg-[#FFC700] text-black px-3 py-2 rounded-lg text-sm font-medium">View</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}