import React, { useEffect, useState } from "react";

export default function FiltersModal({ open = false, onClose = () => { }, onApply = () => { } }) {
  const categoriesList = ["Fast Food", "Lunch", "Dessert", "Drinks", "Vegan", "Healthy"];
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 50]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setCategories([]); // reset when opening (adjust as needed)
      setSortBy("recommended");
      setPriceRange([0, 50]);
    }
  }, [open]);

  function toggleCategory(c) {
    setCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  function apply() {
    onApply({ categories, sortBy, priceRange });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 mb-6 md:mb-0 bg-white text-black rounded-2xl overflow-hidden shadow-lg">
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-lg font-semibold">Filter & Search</div>
          <button className="text-sm text-gray-600" onClick={onClose}>Close</button>
        </header>

        <main className="p-4 space-y-4">
          <section>
            <div className="text-sm text-gray-600 mb-2">Categories</div>
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCategory(c)}
                  className={`px-3 py-2 rounded-full text-sm border ${categories.includes(c) ? "bg-[#FFC700] text-black border-transparent" : "bg-[#F3F6F8] text-black border-transparent"}`}
                  aria-pressed={categories.includes(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="text-sm text-gray-600 mb-2">Sort by</div>
            <div className="flex gap-2">
              {[
                { id: "recommended", label: "Recommended" },
                { id: "fastest", label: "Fastest" },
                { id: "cheapest", label: "Cheapest" }
              ].map(s => (
                <label key={s.id} className={`px-3 py-2 rounded-lg text-sm cursor-pointer border ${sortBy === s.id ? "bg-[#07263A] text-white" : "bg-white text-gray-800"}`}>
                  <input
                    type="radio"
                    name="sort"
                    value={s.id}
                    checked={sortBy === s.id}
                    onChange={() => setSortBy(s.id)}
                    className="hidden"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Price range</div>
              <div className="text-sm font-medium">ETB {priceRange[0]} - ETB {priceRange[1]}</div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), Math.max(Number(e.target.value), priceRange[1])])}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([Math.min(priceRange[0], Number(e.target.value)), Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => { setCategories([]); setSortBy("recommended"); setPriceRange([0, 50]); }}
              className="flex-1 py-3 rounded-lg border border-gray-200 text-sm"
            >
              Clear
            </button>

            <button
              onClick={apply}
              className="flex-1 py-3 rounded-lg bg-[#FFC700] text-black font-semibold text-sm"
            >
              Apply
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}