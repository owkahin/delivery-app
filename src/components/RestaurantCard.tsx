'use client';
import Link from 'next/link';
import { FaStar, FaClock, FaHeart } from 'react-icons/fa';

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

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    return (
        <Link href={`/restaurant/${restaurant._id}`} className="block w-full min-w-[280px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative h-48 bg-gray-200">
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
                    🍽️
                </div>
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm">
                    <FaHeart className="text-gray-300" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-black border border-gray-100 flex items-center gap-1">
                    <FaClock className="text-[var(--primary)]" /> {restaurant.deliveryTime}
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-lg">
                        <FaStar className="text-green-600 text-xs" />
                        <span className="text-xs font-bold text-green-700">{restaurant.rating}</span>
                    </div>
                </div>
                <div className="flex gap-2 text-sm text-gray-500 mb-2">
                    {restaurant.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs">{tag}</span>
                    ))}
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs">{restaurant.priceRange}</span>
                </div>
            </div>
        </Link>
    );
}
