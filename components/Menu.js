'use client';

import { useState } from 'react';
import MenuItem from './MenuItem';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useAdmin } from '@/context/AdminContext';

export default function Menu() {
    const [selectedCazuelaPrice, setSelectedCazuelaPrice] = useState(10000);
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { menuItems, isLoaded } = useAdmin();

    const handleCazuelaAdd = () => {
        const size = selectedCazuelaPrice === 10000 ? 'Pequeña' : 'Grande';
        addToCart(`Cazuela de mariscos (${size})`, selectedCazuelaPrice);
        showToast('Cazuela añadida');
    };

    if (!isLoaded) return null;

    return (
        <section className="menu" id="menu-section">
            <h3 className="section-title">
                <img src="/images/menu-icon.webp" alt="Menú" className="section-icon-img" />
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
                    src="/images/cazuela.webp"
                    alt="Cazuela de Mariscos"
                />
                <div className="menu-item-content">
                    <div className="menu-item-info">
                        <h4 className="item-name">🦞 Cazuela de mariscos</h4>
                        <p className="item-description">Mezcla de mariscos frescos</p>
                    </div>
                    <div className="menu-item-action">
                        <span className="item-price">${selectedCazuelaPrice.toLocaleString()}</span>
                        <button className="add-to-cart-btn" onClick={handleCazuelaAdd}>
                            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" stroke="currentColor" strokeWidth="2" fill="currentColor"/><circle cx="20" cy="21" r="1.5" stroke="currentColor" strokeWidth="2" fill="currentColor"/></svg>
                            Lo quiero
                        </button>
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
