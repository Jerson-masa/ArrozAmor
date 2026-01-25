'use client';

import { useState } from 'react';
import MenuItem from './MenuItem';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

const menuItems = [
    {
        id: 'arroz-mixto',
        name: 'Arroz mixto',
        emoji: '🍛',
        description: 'Pollo, cerdo y camarón',
        price: 6000,
        image: '/images/arroz-mixto.png'
    },
    {
        id: 'arroz-camaron',
        name: 'Arroz con Camarón',
        emoji: '🦐',
        description: 'Camarones frescos del pacífico',
        price: 6000,
        image: '/images/arroz-camaron.png'
    },
    {
        id: 'arroz-cerdo',
        name: 'Arroz con Cerdo',
        emoji: '🥓',
        description: 'Cerdo adobado crujiente',
        price: 6000,
        image: '/images/arroz-cerdo.png'
    }
];

export default function Menu() {
    const [selectedCazuelaPrice, setSelectedCazuelaPrice] = useState(10000);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleCazuelaAdd = () => {
        const size = selectedCazuelaPrice === 10000 ? 'Pequeña' : 'Grande';
        addToCart(`Cazuela de mariscos (${size})`, selectedCazuelaPrice);
        showToast('Cazuela añadida');
    };

    return (
        <section className="menu" id="menu-section">
            <h3 className="section-title">
                <img src="/images/menu-icon.png" alt="Menú" className="section-icon-img" />
                Menú
            </h3>
            <p className="section-subtitle">Conoce nuestros deliciosos platos</p>

            {menuItems.map((item) => (
                <MenuItem key={item.id} {...item} />
            ))}

            {/* Cazuela de Mariscos - Special item with size selector */}
            <div className="menu-item-card" id="cazuela">
                <img
                    className="menu-item-img"
                    src="/images/cazuela.png"
                    alt="Cazuela de Mariscos"
                />
                <div className="menu-item-content">
                    <div className="menu-item-info">
                        <h4 className="item-name">🦞 Cazuela de mariscos</h4>
                        <p className="item-description">Mezcla de mariscos frescos</p>
                    </div>
                    <div className="menu-item-action">
                        <span className="item-price">${selectedCazuelaPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="size-selector">
                <button
                    className={`size-btn ${selectedCazuelaPrice === 10000 ? 'active' : ''}`}
                    onClick={() => setSelectedCazuelaPrice(10000)}
                >
                    Pequeña - $10.000
                </button>
                <button
                    className={`size-btn ${selectedCazuelaPrice === 15000 ? 'active' : ''}`}
                    onClick={() => setSelectedCazuelaPrice(15000)}
                >
                    Grande - $15.000
                </button>
            </div>

            {/* Button removed */}
        </section>
    );
}
