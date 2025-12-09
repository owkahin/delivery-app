'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    restaurantId: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: any) => void;
    removeFromCart: (id: string, removeAll?: boolean) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Calculate total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const addToCart = (item: any) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === item._id);
            if (existing) {
                return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string, removeAll = false) => {
        setCart(prev => {
            if (removeAll) return prev.filter(i => i._id !== id);

            const existing = prev.find(i => i._id === id);
            if (existing && existing.quantity > 1) {
                return prev.map(i => i._id === id ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i._id !== id);
        });
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
