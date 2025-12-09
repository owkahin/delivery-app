import React, { useState, useEffect } from "react";
import Link from 'next/link';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async (term = "") => {
        try {
            const res = await fetch(`http://localhost:5000/api/restaurants?search=${term}`);
            const data = await res.json();
            setRestaurants(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = () => {
        fetchRestaurants(searchTerm);
    };

    return (
        <div className="min-h-screen bg-[#07263A] text-white antialiased">
            <header className="max-w-xl mx-auto px-4 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FFC700] flex items-center justify-center">
                        <img src="/logo192.png" alt="logo" className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-sm text-[#A9BAC6]">California, US</div>
                        <div className="font-medium">Hi, Shopper 👋</div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-lg bg-[#0B394D] flex items-center justify-center" onClick={() => console.log('Open cart')}>
                        <svg className="w-5 h-5 text-[#FFC700]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h2.5a.5.5 0 01.5.5V5a1 1 0 001 1h3a1 1 0 001-1V3.5a.5.5 0 01.5-.5H16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" /></svg>
                    </button>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4">
                <div className="bg-white text-black rounded-2xl p-4 shadow-md -mt-2">
                    <div className="flex items-center gap-3">
                        <input
                            className="flex-1 px-3 py-2 rounded-lg outline-none border border-gray-200"
                            placeholder="Search food or restaurant"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="ml-2 bg-[#FFC700] px-3 py-2 rounded-lg font-semibold" onClick={handleSearch}>Search</button>
                    </div>
                </div>

                <section className="mt-6 grid grid-cols-3 gap-3">
                    {["Fast Food", "Lunch", "Dessert", "Drinks", "Vegan", "More"].map((c, i) => (
                        <div key={i} className="bg-[#0B394D] rounded-xl p-3 text-center text-sm" onClick={() => console.log(`Category: ${c}`)}>
                            <div className="h-10 w-10 mx-auto mb-2 bg-[#FFC700] rounded-full"></div>
                            <div>{c}</div>
                        </div>
                    ))}
                </section>

                <h3 className="mt-6 text-lg font-semibold">Popular Near You</h3>
                <div className="grid grid-cols-1 gap-4 mt-3">
                    {restaurants.map((item) => (
                        <Link href={`/restaurant/${item._id}`} key={item._id} className="block">
                            <article className="flex items-center gap-4 bg-white text-black rounded-xl p-3">
                                <div className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden">
                                    <img src={item.image} alt="food" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-sm text-gray-600">{item.tags[0]} • {item.deliveryTime} • {item.priceRange}</div>
                                </div>
                                <div>
                                    <button className="bg-[#FFC700] px-3 py-2 rounded-lg font-semibold">View</button>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#07263A] w-[94%] max-w-xl rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
                <Link href="/"><button className="text-[#A9BAC6]">Home</button></Link>
                <Link href="/orders"><button className="text-[#A9BAC6]">Orders</button></Link>
                <Link href="/tracking"><button className="text-[#FFC700] font-semibold">Track</button></Link>
                <Link href="/profile"><button className="text-[#A9BAC6]">Profile</button></Link>
            </nav>
        </div>
    );
}