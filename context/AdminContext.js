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
    const [whatsappOrdersCount, setWhatsappOrdersCount] = useState(0);
    const [appDownloadsCount, setAppDownloadsCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // ─── Load Menu Items (Cloud → localStorage → defaults) ───
        const fetchMenuFromCloud = async () => {
            try {
                const res = await fetch('/api/menu');
                if (res.ok) {
                    const data = await res.json();
                    if (data.menuItems && data.menuItems.length > 0) {
                        setMenuItems(data.menuItems);
                        localStorage.setItem('arroz_menu_items', JSON.stringify(data.menuItems));
                        return true;
                    }
                }
            } catch (err) {
                console.error("Error fetching menu items from cloud:", err);
            }
            return false;
        };

        // ─── Load Settings (Cloud → localStorage → defaults) ───
        const fetchSettingsFromCloud = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data.whatsapp_number) {
                        setWhatsappNumber(data.whatsapp_number);
                        localStorage.setItem('arroz_whatsapp_number', data.whatsapp_number);
                    }
                    if (data.restaurant_address) {
                        setRestaurantAddress(data.restaurant_address);
                        localStorage.setItem('arroz_restaurant_address', data.restaurant_address);
                    }
                    return true;
                }
            } catch (err) {
                console.error("Error fetching settings from cloud:", err);
            }
            return false;
        };

        const loadAll = async () => {
            // Load menu
            const menuCloudLoaded = await fetchMenuFromCloud();
            if (!menuCloudLoaded) {
                const savedMenuItems = localStorage.getItem('arroz_menu_items');
                if (savedMenuItems) {
                    setMenuItems(JSON.parse(savedMenuItems));
                } else {
                    setMenuItems(defaultMenuItems);
                    localStorage.setItem('arroz_menu_items', JSON.stringify(defaultMenuItems));
                }
            }

            // Load settings (WhatsApp + Address)
            const settingsCloudLoaded = await fetchSettingsFromCloud();
            if (!settingsCloudLoaded) {
                const savedWhatsapp = localStorage.getItem('arroz_whatsapp_number');
                const savedAddress = localStorage.getItem('arroz_restaurant_address');

                if (savedWhatsapp) {
                    setWhatsappNumber(savedWhatsapp);
                } else {
                    setWhatsappNumber('573001234567');
                    localStorage.setItem('arroz_whatsapp_number', '573001234567');
                }

                if (savedAddress) {
                    setRestaurantAddress(savedAddress);
                } else {
                    setRestaurantAddress('Mi Restaurante, Dirección Central');
                    localStorage.setItem('arroz_restaurant_address', 'Mi Restaurante, Dirección Central');
                }
            }

            // Load local-only counters
            const savedOrders = localStorage.getItem('arroz_whatsapp_orders');
            const savedDownloads = localStorage.getItem('arroz_app_downloads');
            if (savedOrders) setWhatsappOrdersCount(parseInt(savedOrders) || 0);
            if (savedDownloads) setAppDownloadsCount(parseInt(savedDownloads) || 0);

            setIsLoaded(true);
        };

        loadAll();
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

    // ─── Cloud sync for settings (WhatsApp + Address) ───
    const syncSettingsToCloud = async (whatsapp, address) => {
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    whatsapp_number: whatsapp,
                    restaurant_address: address
                })
            });
            const data = await res.json();
            return res.ok ? { success: true } : { success: false, error: data.error };
        } catch (error) {
            console.error('Error syncing settings to cloud:', error);
            return { success: false, error: error.message };
        }
    };

    const incrementWhatsappOrders = () => {
        setWhatsappOrdersCount(prev => {
            const next = prev + 1;
            localStorage.setItem('arroz_whatsapp_orders', next);
            return next;
        });
    };

    const incrementAppDownloads = () => {
        setAppDownloadsCount(prev => {
            const next = prev + 1;
            localStorage.setItem('arroz_app_downloads', next);
            return next;
        });
    };

    const value = {
        menuItems,
        updateMenuItems,
        whatsappNumber,
        updateWhatsappNumber,
        restaurantAddress,
        updateRestaurantAddress,
        syncSettingsToCloud,
        whatsappOrdersCount,
        incrementWhatsappOrders,
        appDownloadsCount,
        incrementAppDownloads,
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
