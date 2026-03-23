'use client';

import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function MenuItem({ id, name, emoji, description, price, image }) {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleAdd = () => {
        addToCart(name, price);
        showToast(`${name} añadido`);
    };

    return (
        <div className="menu-item-card" id={id}>
            <img
                className="menu-item-img"
                src={image}
                alt={name}
            />
            <div className="menu-item-content">
                <div className="menu-item-info">
                    <h4 className="item-name">{emoji} {name}</h4>
                    <p className="item-description">{description}</p>
                </div>
                <div className="menu-item-action">
                    <span className="item-price">${price.toLocaleString()}</span>
                    <button className="add-to-cart-btn" onClick={handleAdd}>
                        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" stroke="currentColor" strokeWidth="2" fill="currentColor"/><circle cx="20" cy="21" r="1.5" stroke="currentColor" strokeWidth="2" fill="currentColor"/></svg>
                        Lo quiero
                    </button>
                </div>
            </div>
        </div>
    );
}
