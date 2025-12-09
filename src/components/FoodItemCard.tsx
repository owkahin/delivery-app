'use client';
import { FaPlus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function FoodItemCard({ item, onAdd }: { item: MenuItem, onAdd?: () => void }) {
    const { addToCart } = useCart();

    return (
        <div className="flex bg-white dark:bg-gray-800 p-4 rounded-3xl gap-4 items-center shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl">
                {/* Placeholder */}
                🍔
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-xl">ETB {item.price}</span>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (onAdd) onAdd();
                            addToCart(item);
                        }}
                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        </div>
    );
}
