'use client';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { FaSearch, FaMapMarkerAlt, FaBell } from 'react-icons/fa';
import CategoryList from '@/components/CategoryList';
import RestaurantCard from '@/components/RestaurantCard';
import FoodItemCard from '@/components/FoodItemCard';
import { useAuth } from '@/context/AuthContext';

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

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), []);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    // Here you could also reverse geocode to get address
  };

  const confirmLocation = () => {
    setIsMapOpen(false);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pb-24 pt-4 px-4 md:px-8 max-w-7xl mx-auto min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Deliver to</span>
          <div
            className="flex items-center gap-1 font-bold text-lg text-[var(--primary)] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsMapOpen(true)}
          >
            {selectedLocation ? `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}` : 'California, US'} <FaMapMarkerAlt />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <FaBell />
        </div>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-8">
        {/* Left Column (Desktop) */}
        <div className="md:col-span-8 lg:col-span-9">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Hi {user ? user.name.split(' ')[0] : 'There'}</h1>
            <p className="text-gray-500">Hungry? Order & Eat.</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Find Your Food or Restaurant..."
              className="w-full bg-white dark:bg-gray-800 py-4 pl-12 pr-4 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-bold">Main Categories</h2>
              <span className="text-[var(--primary)] text-sm font-bold cursor-pointer hover:underline">See all</span>
            </div>
            <CategoryList />
          </div>

          {/* Popular Restaurants */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-bold">Nearby Popular</h2>
              <span className="text-[var(--primary)] text-sm font-bold cursor-pointer hover:underline">See all</span>
            </div>

            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Desktop Sidebar - Optional features like Cart summary or Promotions) */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm sticky top-4">
            <h3 className="font-bold text-lg mb-4">Your Order</h3>
            <div className="text-gray-400 text-center py-8">
              Cart is empty
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-lg">Select Location</h3>
              <button
                onClick={() => setIsMapOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 relative">
              <Map interactive={true} onLocationSelect={handleLocationSelect} />
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={confirmLocation}
                className="w-full bg-[var(--primary)] text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
