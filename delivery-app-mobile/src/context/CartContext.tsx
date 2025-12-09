import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    [key: string]: any;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        const existingItem = cart.find(i => i._id === item._id);

        if (existingItem) {
            setCart(cart.map(i =>
                i._id === item._id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId: string) => {
        const existingItem = cart.find(i => i._id === itemId);

        if (existingItem && existingItem.quantity > 1) {
            setCart(cart.map(i =>
                i._id === itemId
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            ));
        } else {
            setCart(cart.filter(i => i._id !== itemId));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
