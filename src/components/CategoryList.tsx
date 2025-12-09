'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Category {
    _id: string;
    name: string;
    image: string;
}

export default function CategoryList({ onSelectCategory }: { onSelectCategory?: (id: string) => void }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((cat) => (
                <div
                    key={cat._id}
                    className={`flex flex-col items-center min-w-[80px] cursor-pointer ${selectedId === cat._id ? 'opacity-100' : 'opacity-70'}`}
                    onClick={() => {
                        setSelectedId(cat._id);
                        if (onSelectCategory) onSelectCategory(cat._id);
                    }}
                >
                    <div className={`p-4 rounded-2xl mb-2 ${selectedId === cat._id ? 'bg-[var(--primary)]' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <div className="w-8 h-8 relative">
                            {/* Placeholder for image if not valid url, since we used generic paths in seed */}
                            <span className="text-2xl">🍔</span>
                        </div>
                    </div>
                    <span className={`text-sm font-medium ${selectedId === cat._id ? 'text-black dark:text-white' : 'text-gray-500'}`}>{cat.name}</span>
                </div>
            ))}
        </div>
    );
}
