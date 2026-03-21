'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const defaultMenuItems = [
    {
        id: 'arroz-mixto',
        name: 'Arroz mixto',
        emoji: '🍛',
        description: 'Pollo, cerdo y camarón',
        price: 6000,
        image: '/images/arroz-mixto.webp'
    },
    {
        id: 'arroz-camaron',
        name: 'Arroz con Camarón',
        emoji: '🦐',
        description: 'Camarones frescos del pacífico',
        price: 6000,
        image: '/images/arroz-camaron.webp'
    },
    {
        id: 'arroz-cerdo',
        name: 'Arroz con Cerdo',
        emoji: '🥓',
        description: 'Cerdo adobado crujiente',
        price: 6000,
        image: '/images/arroz-cerdo.webp'
    }
];

export function AdminProvider({ children }) {
    const [menuItems, setMenuItems] = useState([]);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedMenuItems = localStorage.getItem('arroz_menu_items');
        const savedWhatsapp = localStorage.getItem('arroz_whatsapp_number');
        const savedAddress = localStorage.getItem('arroz_restaurant_address');

        if (savedMenuItems) {
            setMenuItems(JSON.parse(savedMenuItems));
        } else {
            setMenuItems(defaultMenuItems);
            localStorage.setItem('arroz_menu_items', JSON.stringify(defaultMenuItems));
        }

        if (savedWhatsapp) {
            setWhatsappNumber(savedWhatsapp);
        } else {
            setWhatsappNumber('573001234567'); // Default dummy number
            localStorage.setItem('arroz_whatsapp_number', '573001234567');
        }

        if (savedAddress) {
            setRestaurantAddress(savedAddress);
        } else {
            setRestaurantAddress('Mi Restaurante, Dirección Central');
            localStorage.setItem('arroz_restaurant_address', 'Mi Restaurante, Dirección Central');
        }

        setIsLoaded(true);
    }, []);

    const updateMenuItems = (newItems) => {
        setMenuItems(newItems);
        localStorage.setItem('arroz_menu_items', JSON.stringify(newItems));
    };

    const updateWhatsappNumber = (newNumber) => {
        setWhatsappNumber(newNumber);
        localStorage.setItem('arroz_whatsapp_number', newNumber);
    };

    const updateRestaurantAddress = (newAddress) => {
        setRestaurantAddress(newAddress);
        localStorage.setItem('arroz_restaurant_address', newAddress);
    };

    const value = {
        menuItems,
        updateMenuItems,
        whatsappNumber,
        updateWhatsappNumber,
        restaurantAddress,
        updateRestaurantAddress,
        isLoaded
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
