'use client';
import { useState, useEffect, use } from 'react';
import { FaArrowLeft, FaHeart, FaStar, FaClock, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import FoodItemCard from '@/components/FoodItemCard';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

interface Restaurant {
    _id: string;
    name: string;
    description: string;
    rating: number;
    deliveryTime: string;
    priceRange: string;
    image: string;
    tags: string[];
}

export default function RestaurantDetails({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        if (id) {
            // Fetch Restaurant Info
            fetch(`http://localhost:5000/api/restaurants/${id}`)
                .then(res => res.json())
                .then(data => setRestaurant(data))
                .catch(err => console.error(err));

            // Fetch Menu
            fetch(`http://localhost:5000/api/restaurants/${id}/menu`)
                .then(res => res.json())
                .then(data => {
                    setMenu(data);
                    // Extract unique categories
                    const cats = ['All', ...Array.from(new Set(data.map((item: MenuItem) => item.category)))];
                    // @ts-ignore
                    setCategories(cats);
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    if (!restaurant) return <div className="p-8 text-center">Loading...</div>;

    const filteredMenu = activeCategory === 'All'
        ? menu
        : menu.filter(item => item.category === activeCategory);

    return (
        <div className="pb-24 min-h-screen bg-white dark:bg-black max-w-md mx-auto">
            {/* Header Image Area */}
            <div className="relative h-64 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    🍕
                </div>

                {/* Top Actions */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <Link href="/" className="bg-white p-3 rounded-full shadow-sm text-black">
                        <FaArrowLeft />
                    </Link>
                    <div className="flex gap-2">
                        <button className="bg-white p-3 rounded-full shadow-sm text-black">
                            <FaSearch />
                        </button>
                        <button className="bg-white p-3 rounded-full shadow-sm text-black">
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="-mt-10 relative bg-white dark:bg-black rounded-t-3xl p-6 min-h-[500px]">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                    <div className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold shadow-sm">
                        <FaStar /> {restaurant.rating}
                    </div>
                </div>

                <div className="flex gap-4 text-gray-500 mb-6 text-sm">
                    <div className="flex items-center gap-1">
                        <FaClock className="text-[var(--primary)]" /> {restaurant.deliveryTime}
                    </div>
                    <div className="flex items-center gap-1">
                        <span>Free delivery</span>
                    </div>
                </div>

                {/* Categories Tab */}
                <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${activeCategory === cat
                                    ? 'bg-[var(--primary)] text-black'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold text-xl mb-2">Popular Menu</h2>
                    {filteredMenu.map(item => (
                        <FoodItemCard key={item._id} item={item} onAdd={() => console.log('Add to cart', item)} />
                    ))}
                </div>
            </div>
        </div>
    );
}
