import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
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

    const removeFromCart = (itemId) => {
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

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
