'use client';

import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function MenuItem({ id, name, emoji, description, price, image }) {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const triggerFlyAnimation = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cartIcon = document.querySelector('.cart-btn');
        if (cartIcon) {
            const cartRect = cartIcon.getBoundingClientRect();
            const flyer = document.createElement('div');
            flyer.innerHTML = emoji || '🍲';
            flyer.className = 'flying-item';
            
            const startX = rect.left + rect.width / 2 - 24;
            const startY = rect.top + rect.height / 2 - 24;
            const targetX = cartRect.left + cartRect.width / 2 - 24;
            const targetY = cartRect.top + cartRect.height / 2 - 24;
            
            flyer.style.left = `${startX}px`;
            flyer.style.top = `${startY}px`;
            flyer.style.setProperty('--tx', `${targetX - startX}px`);
            flyer.style.setProperty('--ty', `${targetY - startY}px`);
            
            document.body.appendChild(flyer);
            setTimeout(() => { if (document.body.contains(flyer)) document.body.removeChild(flyer); }, 800);
        }
    };

    const handleAdd = (e) => {
        triggerFlyAnimation(e);
        addToCart(name, price);
        showToast(`${name} añadido`);
    };

    return (
        <div className="menu-item-card" id={id}>
            <img
                className="menu-item-img"
                src={image}
                alt={name}
                loading="lazy"
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
