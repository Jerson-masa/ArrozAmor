'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    const addToCart = useCallback((name, price) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.name === name);
            if (existingItem) {
                return prev.map(item => 
                    item.name === name ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            const newCart = [...prev, { name, price, quantity: 1 }];
            if (prev.length === 0 && typeof window !== 'undefined' && window.openCart) {
                setTimeout(() => window.openCart(), 800); // Wait for flying animation to finish
            }
            return newCart;
        });
    }, []);

    const updateQuantity = useCallback((name, delta) => {
        setCart(prev => prev.map(item => {
            if (item.name === name) {
                const newQuantity = (item.quantity || 1) + delta;
                return { ...item, quantity: Math.max(0, newQuantity) };
            }
            return item;
        }).filter(item => item.quantity > 0));
    }, []);

    const removeFromCart = useCallback((index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    const value = {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        customerAddress,
        setCustomerAddress,
        orderNotes,
        setOrderNotes
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
